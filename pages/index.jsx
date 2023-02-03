import { Chat } from '../components/Chat'

export default function Home() {

  return (
    <>
      <div className=" bg-slate-900 justify-center flex flex-col h-screen">
        <div>
          <Chat />
        </div>
      </div>
    </>
  );
}

