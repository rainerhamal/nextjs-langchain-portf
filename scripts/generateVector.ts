import dotenv from "dotenv";
dotenv.config( { path: ".env.local" } )
// Configure dotenv before other imports

import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { DocumentInterface } from "@langchain/core/documents";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { getEmbeddingsCollection, getVectorStore } from "../src/lib/astradb";

async function generateEmbeddings ()
{
    //To store docs in the astradb vector database
    const vectorStore = await getVectorStore();

    // Delete all the existing vectors that we already have in our database
    const collection = await getEmbeddingsCollection();
    await collection.deleteAll({});

    // page files as strings
    const loader = new DirectoryLoader(
        "src/app/",
        {
            ".tsx": ( path ) => new TextLoader( path ),
        },
        true
    )

    //filter manually page.tsx files manually and remove the classNames and imports from the pageContent
    const docs = ( await loader.load() )
        .filter( doc => doc.metadata.source.endsWith( "page.tsx" ) )
        .map( ( doc ): DocumentInterface =>
        {
            const url = doc.metadata.source
                .replace( /\\/g, "/" )
                .split( "/src/app" )[ 1 ]
                .split( "/page." )[ 0 ] || "/"

            // modify the page content to remove unecessary section
            const pageContentTrimmed = doc.pageContent
                .replace( /^import.*$/gm, "" ) //remove all import statements
                .replace( / className=(["']).*?\1| className={.*?}/g, "" ) //remove all className props
                .replace( /^\s*[\r]/gm, "" ) //remove empty lines
                .trim();

            return {
                pageContent: pageContentTrimmed,
                metadata: { url } //relative url to be used by the language model
            }
        } )

    //console.log(docs); //npm run generate to check what kind of docs are being returned

    //split to smaller chunks
    const splitter = RecursiveCharacterTextSplitter.fromLanguage( "html" );

    const splitDocs = await splitter.splitDocuments( docs )

    //console.log(splitDocs);
    await vectorStore.addDocuments( splitDocs ) //add splitDocs inside vectorStore
}

generateEmbeddings();