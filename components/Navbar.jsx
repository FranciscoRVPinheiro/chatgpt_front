import Link from "next/link"
import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image"

export default function Navbar() {

  const { data: session } = useSession();

    let logged = session ?
      <Link
        onClick={() => signOut()}
        href="/"
        className="text-white font-mono flex pt-6 justify-center mr-3"
      >
        Logout
      </Link> :
      <Link
        onClick={() => signIn()}
        href="/"
        className="text-white font-mono flex pt-6 justify-center mr-6"
      >
        Login
      </Link>

    return (
      <>
        <nav className="flex justify-between bg-neutral-900 fixed top-0 pb-3 w-full">
          <div className="pt-4 justify-center ">
            <h1 className="text-2xl text-white text-left font-mono font-bold ml-6">
              Jarvis
            </h1>
            <p className="text-white text-center font-mono text-sm ml-6">
              Powered by <Link href="https://openai.com/blog/chatgpt/">ChatGPT-3</Link>
            </p>
          </div>
          <div className="flex">
            {logged}
            <div className="mr-4 mt-6">
              {session ? (
                <Image
                  width="25"
                  height="25"
                  className="rounded-full border border-blue-600"
                  src={session?.user?.image}
                  alt="Google Avatar"
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </nav>
      </>
    );
}
