// @ts-nocheck
import { Chat } from "../components/Chat";
import Head from "../components/Head";
import LoginPage from "../components/LoginPage";
import { useSession } from "next-auth/react";

export default function Home() {

  const { data: session } = useSession();

  return (
    <>
      <Head />
      <div className="bg-neutral-900 justify-end flex flex-col h-screen">
        <div className="pt-16 max-h-full">
          {session ? <Chat /> : <LoginPage />}
        </div>
      </div>
    </>
  );
}
