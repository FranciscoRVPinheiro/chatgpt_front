import { Layout, Text, Page } from '@vercel/examples-ui'
import { Chat } from '../components/Chat'

function Home() {
  return (
    <div className="bg-black flex items-center justify-center h-screen">
      <Page className="flex flex-col gap-6">
        <section className="flex flex-col gap-6 text-slate-300">
          <Text variant="h1">Personal Assistant</Text>
          <Text className="text-zinc-600">Powered by Chatgpt-3</Text>
        </section>

        <section className="flex flex-col gap-3">
          <div className="lg:w-2/3">
            <Chat />
          </div>
        </section>
      </Page>
    </div>
  );
}

Home.Layout = Layout

export default Home
