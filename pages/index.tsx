import { Chat } from "../components/Chat";
import Head from "../components/Head";

export default function Home() {

  return (
    <>
      <Head />
      <div className=" bg-neutral-900 justify-center flex flex-col h-screen">
        <div className="max-h-full overflow-y-auto">
          <Chat />
        </div>
      </div>
    </>
  );
}
