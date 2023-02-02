import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react";
import Navbar from "../components/Navbar";

import '@vercel/examples-ui/globals.css'

export default function App({ 
  Component, 
  pageProps: {   session, ...pageProps } }: AppProps) {

  return (

      <SessionProvider session={session}>
        <Navbar />
        <Component {...pageProps} />
      </SessionProvider>

  );
}

