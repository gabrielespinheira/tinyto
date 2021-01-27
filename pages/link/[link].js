import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Access() {
  const router = useRouter()
  const { link } = router.query

  useEffect(() => {
    async function loadLink() {
      if (typeof link === 'undefined') {
        return
      }

      const res = await fetch(`/api/${link}`)
      const data = await res.json()

      router.push(data.origin)
    }

    loadLink()
  }, [link])

  return (
    <>
      <Head>
        <title>Loading</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  )
}
