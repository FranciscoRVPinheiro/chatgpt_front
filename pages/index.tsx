// @ts-nocheck
import { Chat } from "../components/Chat";
import Head from "../components/Head";

export default function Home() {

  return (
    <>
      <Head />
      <div className="bg-neutral-900 justify-end flex flex-col h-screen max-h-full">
        <div className="max-h-full">
          <Chat />
        </div>
      </div>
    </>
  );
}
