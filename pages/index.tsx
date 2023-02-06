// @ts-nocheck
import { Chat } from "../components/Chat";
import Head from "../components/Head";

export default function Home() {
  // bg-neutral-900
  return (
    <>
      <Head />
      <div className="bg-neutral-900 justify-end flex flex-col h-screen">
        <div className="pt-16 max-h-full">
          <Chat />
        </div>
      </div>
    </>
  );
}
