import { useChat, Message } from "ai/react";
import { cn } from "@/lib/utils";
import { Bot, SendHorizontal, Trash, XCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

interface AIChatBoxProps
{
  open: boolean;
  onClose: () => void
}

export default function AIChatBox ( { open, onClose }: AIChatBoxProps )
{
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
    error
  } = useChat(
    {/*{
    initialMessages: [
      {
        id: "1",
        role: "assistant",
        content: "Hi, I'm the chatbot!"
      },
      {
        id: "2",
        role: "user",
        content: "Hi, I'm the user!"
      },
      {
        id: "3",
        role: "assistant",
        content: `
  [NextJS Tutorial](https://nextjs.org/learn/dashboard-app/next-steps)
          List:
  - Item1
  - Item2
  - Item3
          `
      },
    ]
  }*/} ); // /api/chat

  const inputRef = useRef<HTMLInputElement>( null );
  const scrollRef = useRef<HTMLDivElement>( null );

  // hook to scroll down right away whenever a new message is received
  useEffect( () =>
  {
    if ( scrollRef.current )
    {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [ messages ] );

  // hook to put the chatinput in focus every time chatbox is opened
  useEffect( () =>
  {
    if ( open )
    {
      inputRef.current?.focus();
    }
  }, [ open ] );

  const lastMessageIsUser = messages[ messages.length - 1 ]?.role === "user";

  return (
    <div
      className={ cn(
        "bottom-0 right-0 z-50 w-full max-w-[500px] p-1 xl:right-36",
        open ? "fixed" : "hidden",
      ) }
    >
      {/*close button*/ }
      <button onClick={ onClose } className="mb-1 ms-auto block">
        <XCircle size={ 30 } className="rounded-full bg-background" />
      </button>

      {/*Chatbox below the close button*/ }
      <div className="flex h-[600px] flex-col rounded border bg-background shadow-xl">

        {/*div which will contain the chat message*/ }
        <div className="mt-3 h-full overflow-y-auto px-3" ref={ scrollRef }>

          {/*to map out the messages between ai and user*/ }
          { messages.map( message => (
            <ChatMessage message={ message } key={ message.id } />
          ) ) }

          {/*text to show when there's no message from the user and chatbot*/ }
          { !error && messages.length === 0 && (
            <div className="mx-8 flex h-full flex-col items-center justify-center gap-3 text-center">
              <Bot size={ 28 } />
              <p className="text-lg font-medium">
                Send a message to start the AI chat!
              </p>
            </div>
          ) }

          {/*handle when chatbot is loading but hasn't started streaming*/ }
          { isLoading && lastMessageIsUser && (
            <ChatMessage
              message={ {
                id: "loading",
                role: "assistant",
                content: "Thinking...",
              } } />
          ) }

          {/*Error handling*/ }
          { error && (
            <ChatMessage
              message={ {
                id: "error",
                role: "assistant",
                content: "Something went wrong. Please try again!",
              } } />
          ) }
        </div>

        {/*text message input field div*/ }
        <form onSubmit={ handleSubmit } className="m-3 flex gap-1">

          {/* clear chat button */}
          <button
            type="button"
            className="flex w-10 flex-none items-center justify-center"
            title="Clear chat"
            onClick={ () => setMessages( [] ) }
          >
            <Trash size={ 24 } />
          </button>

          {/* input message filed */}
          <input
            value={ input }
            onChange={ handleInputChange }
            placeholder="Say something..."
            className="grow rounded border bg-background px-3 py-2"
            ref={ inputRef }
          />

          {/* submit button */}
          <button
            type="submit"
            className="flex w-10 flex-none items-center justify-center disabled:opacity-50"
            disabled={ input.length === 0 }
            title="Submit message"
          >
            <SendHorizontal size={ 24 } />
          </button>

        </form>
      </div>
    </div>
  );
}


// message layout
interface ChatMessageProps
{
  message: Message
}

function ChatMessage ( { message: { role, content } }: ChatMessageProps )
{
  //variable for role assistant
  const isAiMessage = role === "assistant";

  return (
    <div className={ cn(
      "mb-3 flex items-center",
      isAiMessage ? "me-5 justify-start" : "ms-5 justify-end",
    ) }>
      {/* Role: {role}
      Message: {content} */}

      {/* ai message and bot icon */ }
      { isAiMessage && <Bot className="mr-2 flex-none" /> }

      <div
        className={ cn( "rounded-md border px-3 py-2", isAiMessage ? "bg-background" : "bg-foreground text-background", ) }
      >
        {/*to render content in markdown wrap content in ReactMarkdown*/ }
        {/* The components prop is used to customize the rendering of Markdown elements. It accepts an object where the keys are the names of the Markdown elements you want to customize, and the values are React components that will be used to render these elements. */ }
        <ReactMarkdown
          components={ {
            a: ( { node, ref, ...props } ) => (
              <Link { ...props }
                href={ props.href ?? "" }
                className="text-primary hover:underline"
              /> ),

            p: ( { node, ...props } ) => (
              <p { ...props } className="mt-3 first:mt-0" />
            ),

            ul: ( { node, ...props } ) => (
              <ul
                { ...props }
                className="mt-3 list-inside list-disc first:mt-0"
              />
            ),

            li: ( { node, ...props } ) => <li { ...props } className="mt-1" />,
          } }>
          { content }
        </ReactMarkdown>
      </div>

    </div>
  );
}