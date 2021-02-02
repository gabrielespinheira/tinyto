import { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { login, isLogged } from 'sdk/auth'

const LOGGED_ROUTE = '/admin'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    if (isLogged()) {
      router.push(LOGGED_ROUTE)
    }
  }, [])

  const handleSignIn = () => {
    login()
      .then(() => {
        router.push(LOGGED_ROUTE)
      })
      .catch((err) => {
        console.warn(err)
      })
  }

  return (
    <>
      <Head>
        <title>URL Shortener</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>URL Shortener</h1>

      <button onClick={handleSignIn}>Login com Google</button>
    </>
  )
}
