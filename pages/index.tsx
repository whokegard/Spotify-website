import Head from 'next/head'
import { getSession, GetSessionParams } from 'next-auth/react'
import Center from '../components/Center'
import Sidebar from '../components/Sidebar'
import Player from '../components/Player'

export default function Home() {
  return (
    <div className="h-screen overflow-hidden bg-black">
      <Head>
        <title>Vibify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex">
        <Sidebar />
        <Center />
      </main>

      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  )
}

export async function getServerSideProps(
  context: GetSessionParams | undefined
) {
  const session = await getSession(context)

  return {
    props: {
      session,
    },
  }
}
