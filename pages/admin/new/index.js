import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import axios from 'axios'
import cookie from 'js-cookie'

export default function New() {
  const [origin, setOrigin] = useState()
  const router = useRouter()

  const handleBack = () => {
    return router.push('/admin')
  }

  const handleNew = async () => {
    // TODO: validação http/https

    const token = cookie.get('token')

    const shortcut = await axios.post(
      `/api/shortcuts`,
      {
        origin: origin,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )

    return router.push('/admin')
  }

  return (
    <>
      <Head>
        <title>URL Shortener</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Cadastrar</h1>

      <input
        type="text"
        name="origin"
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
      />
      <button onClick={handleNew}>Cadastrar</button>

      <hr />

      <button onClick={handleBack}>Voltar</button>
    </>
  )
}
