// import { getVectorStore } from "@/lib/astradb";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import OpenAI from "openai";
import
  {
    ChatPromptTemplate,
    MessagesPlaceholder,
    PromptTemplate,
  } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { Redis } from "@upstash/redis";
import
  {
    LangChainStream,
    OpenAIStream,
    StreamingTextResponse,
    Message as VercelChatMessage,
  } from "ai";
import { UpstashRedisCache } from "langchain/cache/upstash_redis";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { getVectorStore } from "@/lib/astradb";

export async function POST ( req: Request )
{
  try
  {
    const body = await req.json();
    const messages = body.messages;

    //create chatHistory
    const chatHistory = messages
      .slice( 0, -1 ) //removes the last message from the currentMessageContent array,already in the current user message
      .map( ( m: VercelChatMessage ) =>
        m.role === "user"
          ? new HumanMessage( m.content )
          : new AIMessage( m.content )
      );

    //getting the last message from the messages array
    const currentMessageContent = messages[ messages.length - 1 ].content;

    // In-memory caching
    const cache = new UpstashRedisCache({
      client: Redis.fromEnv(),
    });

    //calling OpenAI
    // const openai = new OpenAI();

    //streaming langchain uses the vercel sdk langchainstream function
    const { stream, handlers } = LangChainStream();

    // using langchain's ChatOpenAI
    const chatModel = new ChatOpenAI( {
      modelName: "gpt-3.5-turbo-0125",
      streaming: true,
      callbacks: [ handlers ], //stream callback
      verbose: true,
      cache, //activates in-memory cache
    } );

    //new chatModel to be used for the rephrasing prompt so it doesn't contain the streaming callback
    const rephraseModel = new ChatOpenAI( {
      modelName: "gpt-3.5-turbo-0125",
      verbose: true,
      cache,
    } );

    //getVectorStore created in astradb.ts, this time, to retrieve the embeddings
    const retriever = ( await getVectorStore() ).asRetriever();

    //create rePhrase prompt so chatcan take in chatHistory but only with the relevant history
    const rephrasePrompt = ChatPromptTemplate.fromMessages([
      new MessagesPlaceholder("chat_history"),
      [
        "user", "{input}"
      ],
      [
        "user", "Given the above conversation, generate a search query to look up in order to get information relevant to the current question. " +
        "Whenever it makes sense, provide links to the pages that contain more information about the topic from the give context." +
        "Don't leave out any relevant keywords. Only return the query and no other text. "
      ]

    ]);

    const historyAwareRetrieverChain = await createHistoryAwareRetriever({
      llm: rephraseModel,
      retriever,
      rephrasePrompt,
    })

    //OpenAI's systemmessage template
    // const systemMessage: ChatCompletionMessageParam = {
    //     role: "system",
    //     content: "You are a helpful chatbot. Answer all the user questions as accurately as you can."
    // }

    //   const response = await openai.chat.completions.create({
    //     model: "gpt-3.5-turbo-0125",
    //     stream: true,
    //     messages: [systemMessage, ...messages]
    // })

    //Using Langchain's own templates:
    const prompt = ChatPromptTemplate.fromMessages( [
      [
        "system",
        "You are a helpful chatbot. Answer all the user questions as accurately as you can." +
        "Answer the user's questions based on the below content." +
        "Whenever it makes sense, provide links to the pages that contain more information about the topic from the give context." +
        "Format your messages in markdown format. \n\n" +
        "Context: \n {context}"
      ],
      new MessagesPlaceholder("chat_history"),
      [
        "user", "{input}"
      ]
    ] )

    //Prompt to be used by documentPrompt for formatting the document
    const docPrompt = PromptTemplate.fromTemplate( "Page URL: {url}\n\n Page content: \n{page_content}" )

    // const chain = prompt.pipe(chatModel);
    const combineDocsChain = await createStuffDocumentsChain( {
      llm: chatModel,
      prompt,
      documentPrompt: docPrompt,
      documentSeparator: "\n--------\n"
    } );

    const retrievalChain = await createRetrievalChain( {
      combineDocsChain,
      retriever: historyAwareRetrieverChain,
    } );

    // chain.invoke({
    //   input: currentMessageContent
    // })

    retrievalChain.invoke( {
      input: currentMessageContent,
      chat_history: chatHistory,
    } )

    // const stream = OpenAIStream(response)

    return new StreamingTextResponse( stream );
  } catch ( error )
  {
    console.error( error );
    return Response.json( { error: "Internal server error" }, { status: 500 } );
  }
}
