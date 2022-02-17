import { ChevronDownIcon, LogoutIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import { shuffle } from 'lodash'
import { useState, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { playlistIdState, playlistState } from '../atoms/playlistAtom'
import useSpotify from '../hooks/useSpotify'
import Songs from './Songs'
import { signOut } from 'next-auth/react'

const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
]

function Center() {
  const { data: session } = useSession()
  const spotifyApi = useSpotify()
  const [color, setColor] = useState(null)
  const playlistId = useRecoilValue(playlistIdState)
  const [playlist, setPlaylist] = useRecoilState(playlistState)
  const [isActive, setActive] = useState('false')

  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [playlistId])

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body)
      })
      .catch((err) => console.log('Something went wrong!', err))
  }, [spotifyApi, playlistId])

  const handleToggle = () => {
    setActive(!isActive)
  }

  return (
    <div className="relative h-screen flex-grow select-none overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8" onClick={handleToggle}>
        <div className="flex cursor-pointer items-center space-x-3 rounded-full bg-[#2e2e2e] pr-2 opacity-90 hover:opacity-80">
          <img
            className="h-10 w-10 rounded-full p-1"
            src={session?.user.image}
            alt="user image"
          />
          <h2 className="text-white">{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5 text-white" />
        </div>
      </header>
      <div
        className={
          `absolute right-8 top-[4.3rem] h-10 w-52 flex-col rounded-sm bg-[#2e2e2e] text-white` +
          ' ' +
          `${isActive ? 'hidden' : 'flex'}`
        }
      >
        <div
          className="flex cursor-pointer items-center justify-between px-3 py-2"
          onClick={signOut}
        >
          <p className="hover:bg-[#2b2d30]">Log out</p>
          <LogoutIcon className="h-5 w-5" />
        </div>
      </div>
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 pl-5 pb-5 text-white`}
      >
        <img
          className="h-44 w-44 shadow-2xl"
          src={playlist?.images?.[0]?.url}
          alt="album image"
        />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl">{playlist?.name}</h1>
        </div>
      </section>

      <div>
        <Songs />
      </div>
    </div>
  )
}

export default Center
