import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import axios from 'axios'

export default function Edit() {
  const [origin, setOrigin] = useState()
  const router = useRouter()
  const { code } = router.query

  const handleBack = () => {
    return router.push('/admin')
  }

  const handleEdit = async () => {
    // TODO: validação http/https

    const update = await axios.put(`/api/shortcuts/${code}`, {
      origin: origin,
    })

    return update
  }

  return (
    <>
      <Head>
        <title>URL Shortener</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Editar</h1>

      <div>id: {code}</div>

      <input
        type="text"
        name="origin"
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
      />
      <button onClick={handleEdit}>Salvar</button>

      <hr />

      <button onClick={handleBack}>Voltar</button>
    </>
  )
}
