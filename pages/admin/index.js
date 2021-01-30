import Head from 'next/head'
import { useRouter } from 'next/router'

import { logout } from 'sdk/auth'

export default function Admin() {
  const router = useRouter()

  const handleSignOut = () => {
    logout().then(() => {
      router.push('/')
    })
  }

  return (
    <>
      <Head>
        <title>URL Shortener</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Hello Admin</h1>

      <button onClick={handleSignOut}>Logout</button>
    </>
  )
}
