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

  const cleanInput = () => {
    if (input.trim().length > 0) {
      sendMessage(input);
      setInput("");
    }
  };

  return (
    <div className="mt-6 flex clear-both">
      <input
        ref={textInput}
        type="search"
        aria-label="chat input"
        required
        className="w-full flex-auto appearance-none rounded-md border border-indigo-600 bg-slate-300 px-3 py-[calc(theme(spacing.2)-1px)] focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-800"
        value={input}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            cleanInput();
          }
        }}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <Button
        type="submit"
        className="ml-4 flex-none"
        onClick={() => {
          cleanInput();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
          />
        </svg>
      </Button>
    </div>
  );
}

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
        className="p-6 bg-neutral-900 max-h-full overflow-y-auto"
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
