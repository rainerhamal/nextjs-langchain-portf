//set-up astra db database connection

import { AstraDBVectorStore } from "@langchain/community/vectorstores/astradb";
import { OpenAIEmbeddings } from "@langchain/openai";
import { DataAPIClient } from '@datastax/astra-db-ts';




const endpoint = process.env.ASTRA_DB_ENDPOINT || "";
const token = process.env.ASTRA_DB_APPLICATION_TOKEN || "";
const collection = process.env.ASTRA_DB_COLLECTION || "";
const namespace = "myNextjsPortfolio" || "";

// console.log(namespace);

// throw an error if the values above are empty
if (!token || !endpoint || !collection) {
    throw new Error(
        "Please set ASTRA_DB_ENDPOINT, ASTRA_DB_APPLICATION_TOKEN, and ASTRA_DB_COLLECTION environment variables."
    )
}

export async function getVectorStore() {
    return AstraDBVectorStore.fromExistingIndex(
        new OpenAIEmbeddings({ modelName: "text-embedding-3-small"}),
        {
            token,
            endpoint,
            collection,
            collectionOptions: {
                vector: {
                    dimension: 1536,
                    metric: "cosine"
                }
            }
        }
    )
}

// function use to access database and use to delete all the collection embeddings
export async function getEmbeddingsCollection() {
    const client = new DataAPIClient(token);
    const db = client.db(endpoint, namespace );
    return db.collection(collection);
}