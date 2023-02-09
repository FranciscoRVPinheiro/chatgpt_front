import { useSession } from "next-auth/react";
import Spinner from "./Spinner";

export default function LoginPage() {
   
  const { status } = useSession();  

  return (
    <div className="flex justify-center items-center h-screen bg-neutral-900">
      <div className="text-white font-mono text-xl animate-pulse">
        {status === "loading" ? <Spinner /> : "Login to use Jarvis"}
      </div>
    </div>
  );
}
