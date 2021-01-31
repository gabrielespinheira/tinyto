import Head from 'next/head'
import { useRouter } from 'next/router'
import useSWR from 'swr'

import { logout } from 'sdk/auth'

export default function Admin() {
  const router = useRouter()
  const { data, error } = useSWR('/profile')

  const handleSignOut = () => {
    logout().then(() => {
      router.push('/')
    })
  }

  if (!data) return <div>Loading</div>
  if (error) return <div>Error: {error}</div>

  return (
    <>
      <Head>
        <title>URL Shortener</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Hello Admin</h1>

      <div>{JSON.stringify(data)}</div>

      <button onClick={handleSignOut}>Logout</button>
    </>
  )
}
