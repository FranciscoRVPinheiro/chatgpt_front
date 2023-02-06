// @ts-nocheck
import { useEffect, useState, useRef } from "react";
import { Button } from "./Button";
import { type Message, ChatLine } from "./ChatLine";
import LoadingChatLine from "./LoadingChatLine";
import { useCookies } from "react-cookie";

const COOKIE_NAME = "nextjs-ai-chat-gpt3";

export const initialMessages: Message[] = [
  {
    who: "bot",
    message: "(☞ﾟヮﾟ)☞",
  },
];

const InputMessage = ({ input, setInput, sendMessage }: any) => {
  
  const textInput = useRef(null);

  useEffect(() => {
    if (textInput.current) {
      textInput.current.focus();
    }
  }, []);

   const isDisabled = input ? false : true

   const cleanEnterInput = () => {
      if (input.trim().length > 0) {
          sendMessage(input);
          setInput("");
    }
   }

   const cleanButtonInput = () => {
      if (input.trim().length > 0) {
        sendMessage(input);
        setInput("");
      }
   }

  return (
    <div className="mt-6 flex clear-both">
      <input
        ref={textInput}
        type="text"
        aria-label="chat input"
        required
        className="w-full flex-auto appearance-none rounded-md border border-indigo-600 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-white focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-800 sm:text-sm"
        value={input}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            cleanEnterInput();
          }
        }}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <Button
          type="submit"
          disabled={isDisabled}
          className="ml-4 flex-none font-mono"
          onClick={() => {
            cleanButtonInput()
          }}
        >
          Send
      </Button>
      
    </div>
  );}

export function Chat() {

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [cookie, setCookie] = useCookies([COOKIE_NAME]);

  const containerRef = useRef(null);
  // scroll to bottom every new msg.
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  });

  useEffect(() => {
    if (!cookie[COOKIE_NAME]) {
      // generate a semi random short id
      const randomId = Math.random().toString(36).substring(7);
      setCookie(COOKIE_NAME, randomId);
    }
  }, [cookie, setCookie]);

  // send message to API /api/chat endpoint
  const sendMessage = async (message: string) => {
    setLoading(true);
    const newMessages = [
      ...messages,
      { message: message, who: "user" } as Message,
    ];
    setMessages(newMessages);
    const last10messages = newMessages.slice(-10);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: last10messages,
        user: cookie[COOKIE_NAME],
      }),
    });
    const data = await response.json();

    // strip out white spaces from the bot message
    const botNewMessage = data.text.trim();

    setMessages([
      ...newMessages,
      { message: botNewMessage, who: "bot" } as Message,
    ]);
    setLoading(false);
  };

  return (
    <>
      <div
        ref={containerRef}
        className="rounded-2xl p-6 bg-neutral-900 max-h-full overflow-y-auto"
      >
        {messages.map(({ message, who }, index) => (
          <ChatLine key={index} who={who} message={message} />
        ))}
        
        {loading && <LoadingChatLine />}
      </div>

      <div className="px-6 pb-3 fixed bottom-0 left-1/2 -translate-x-1/2 w-full">
        <InputMessage
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
        />
      </div>
    </>
  );
}
