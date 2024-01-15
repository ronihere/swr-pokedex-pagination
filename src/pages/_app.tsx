import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Anton } from 'next/font/google'
import Head from 'next/head';
import RootLayout from './layout';
const anton = Anton({ subsets: ['latin'], weight: ["400"] });
export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <title>NextJS PokéDex</title>
      <meta name="description" content="NextJS PokéDex app by Coding in Flow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  <main
    className={`p-10 w-full ${anton.className}`}
    >
      <RootLayout>
    <Component {...pageProps} />
      </RootLayout>
    </main>
    </>
}
