import { signIn, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import spotifyAPI from '../lib/spotify'

function useSpotify() {
  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      if (session.error === 'RefreshAccessTokenError') {
        signIn()
      }

      spotifyAPI.setAccessToken(session.user.accessToken)
    }
  }, [session])

  return spotifyAPI
}

export default useSpotify
