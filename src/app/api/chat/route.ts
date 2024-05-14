// import { getVectorStore } from "@/lib/astradb";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import OpenAI from "openai";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
  PromptTemplate,
} from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { Redis } from "@upstash/redis";
import {
  LangChainStream,
  OpenAIStream,
  StreamingTextResponse,
  Message as VercelChatMessage,
} from "ai";
import { UpstashRedisCache } from "langchain/cache/upstash_redis";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import { createRetrievalChain } from "langchain/chains/retrieval";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = body.messages;

    //getting the last message from the messages array
    const currentMessageContent = messages[messages.length - 1].content;

    //calling OpenAI
    // const openai = new OpenAI();

    //streaming langchain uses the vercel sdk langchainstream function
    const{stream, handlers} = LangChainStream();

    // using langchain's ChatOpenAI
    const chatModel = new ChatOpenAI({
      modelName: "gpt-3.5-turbo-0125",
      streaming: true,
      callbacks: [handlers],
      
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
    const prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        "You are a helpful chatbot. Answer all the user questions as accurately as you can."
      ],
      [
        "user", "{input}"
      ]
    ])

    const chain = prompt.pipe(chatModel);

    chain.invoke({
      input: currentMessageContent
    })

    // const stream = OpenAIStream(response)



    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
