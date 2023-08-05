import type { NextPage } from 'next'
import { signOut, useSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import Info from '../components/Info'
import Recommend from '../components/Recommend'

const Home: NextPage = () => {
  
  const { data: session } = useSession();
  //console.log(session);
  
  return (
    <div className="min-h-screen items-center justify-center bg-black text-white p-10">
      <Head>
        <title>Discover Spotify App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

       {/* NAV / HEADER AREA */}
      <div className="flex justify-between items-center">
          <Image src="/spotify_logo.png" alt="spotify logo" height={40} width={40} />
          <div className="flex space-x-2 items-center">
            <div className="flex items-center space-x-3 rounded-full p-2">
              <h2> Hi {session?.user?.name} </h2>
              <Image className="rounded-full" src={session?.user?.image ?? "/spotify_user.jpg"} alt="spotify user image" width={50} height={50}/>
            </div>
            <button className="hover:text-gray-500 bg-slate-400 py-1 px-2 rounded-md"
            onClick={() => signOut() }>
              <p>Logout</p>
            </button>
          </div>
      </div>

       {/* MAIN SECTION OF DASHBOARD */}
      <main className="flex w-full flex-1 flex-col items-center justify-center p-10 text-center">
       
        <h1 className="text-6xl font-bold pb-10">
          Welcome to <span className="text-[5EB7AD]">DiscoverSpotify </span>
        </h1>


        {/* do control spacebar to auto import component */}

        <Info />

        <Recommend />


      

      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <p>Powered by Hannah</p>
      </footer>
    
    </div>
  )
}

export default Home
