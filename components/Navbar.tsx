import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function Navbar() {

  const { data: session } = useSession();
  console.log(session?.user.image)

  let logged = (
    <Link
      onClick={() => signOut()}
      href="/"
      className="text-white font-extrabold font-mono flex pt-4 justify-center mr-6"
    >
      Logout
    </Link>
  );

  let notLogged = (
    <Link
      onClick={() => signIn()}
      href="/"
      className="text-white font-extrabold font-mono flex pt-4 justify-center mr-6"
    >
      Login
    </Link>
  );


    return (
      <>
        <nav className=" flex justify-between bg-slate-900 sticky top-0">
          <div className=" pt-2 justify-center ">
            <h1 className="text-2xl text-white text-center font-mono font-bold ml-5 ">
              Jarvis
            </h1>
            <p className="text-slate-300 text-center font-extralight font-mono text-sm ml-5">
              Powered by Chatgpt-3
            </p>
          </div>
          <div className="flex">
            <div>{session ? logged : notLogged}</div>
            <div className="mr-4 mt-4">
              {session ? (
                <Image
                  width="25"
                  height="25"
                  className="rounded-full"
                  src={session.user.image}
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
