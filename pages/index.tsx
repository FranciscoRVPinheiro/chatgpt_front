// import { Layout, Text, Page } from '@vercel/examples-ui'
import { Chat } from '../components/Chat'

//flex flex-grow items-center justify-center scroll-auto w-full h-full

export default function Home() {
  return (
    <div className=" bg-slate-900 justify-center flex flex-col h-screen">
      {/* <Page className="flex flex-col gap-6">
        <section className="flex flex-col gap-6 text-slate-300 ml-40">
          <Text variant="h1">Personal Assistant</Text>
          <Text className="text-zinc-600">Powered by Chatgpt-3</Text>
        </section>

        <section className="flex flex-col gap-3 ml-40">
          <div className="lg:w-5/6 h-4/5">
            <Chat />
          </div>
        </section>
      </Page> */}

      <div className="my-2 justify-center">
        <h1 className="text-2xl text-white text-center font-bold ">Jarvis</h1>
        <p className="text-slate-300 text-center my-1 font-extralight">
          Powered by Chatgpt-3
        </p>
      </div>
      <div className="max-h-full overflow-y-auto">
        <Chat />
      </div>
    </div>
  );
}

// Home.Layout = Layout

