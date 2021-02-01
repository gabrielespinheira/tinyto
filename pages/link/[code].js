import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Access() {
  const router = useRouter()
  const { code } = router.query

  useEffect(() => {
    async function loadLink() {
      if (typeof code === 'undefined') {
        return
      }

      const res = await fetch(`/api/shortcuts/${code}`)
      const data = await res.json()

      console.log(data)

      return router.push(data.origin)
    }

    loadLink()
  }, [code])

  return (
    <>
      <Head>
        <title>Loading</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  )
}
