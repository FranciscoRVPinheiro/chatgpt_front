import { useSession } from "next-auth/react";

export default function LoginPage() {
   
  const { status } = useSession();  

  return (
    <div className="flex justify-center items-center h-screen bg-neutral-900">
      <p className="text-white font-mono text-xl animate-pulse">
        {status === "loading" ? "" : "Login to use Jarvis"}
      </p>
    </div>
  );
}
