import Link from "next/link"
import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image"

export default function Navbar() {

  const { data: session } = useSession();

    let logged = session ? (
      <Link
        onClick={() => signOut()}
        href="/"
        className="text-white font-mono text-sm flex pt-7 justify-center mr-2"
      >
        Logout
      </Link>
    ) : (
      <Link
        onClick={() => signIn()}
        href="/"
        className="text-white font-mono text-sm flex pt-7 justify-center mr-4"
      >
        Login
      </Link>
    );

    return (
      <>
        <nav className="flex justify-between bg-neutral-900 fixed top-0 pb-3 w-full">
          <div className="mt-4 justify-center">
            <h1 className="text-2xl text-white text-left font-mono font-bold ml-6">
              Jarvis
            </h1>
            <p className="text-white text-center font-mono text-xs ml-6">
              Powered by ChatGPT-3
            </p>
          </div>
          <div className="flex">
            {logged}
            <div className="pr-6 mt-6">
              {session ? (
                <Image
                  width="25"
                  height="25"
                  className="rounded border border-white"
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
