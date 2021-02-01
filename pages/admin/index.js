import Head from 'next/head'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import axios from 'axios'

import { logout } from 'sdk/auth'

export default function Admin() {
  const router = useRouter()
  const { data: shortcuts, error } = useSWR('/shortcuts/list')

  const handleSignOut = () => {
    logout().then(() => {
      return router.push('/')
    })
  }

  const handleEdit = (id) => {
    return router.push(`/admin/edit/${id}`)
  }

  const handleDelete = async (id) => {
    // TODO: usuário confirmar

    const deleted = await axios.delete(`/api/shortcuts/${id}`)

    return deleted

    // TODO: mutate SWR list
  }

  const handleOpen = (id) => {
    return window.open(`/link/${id}`)
  }

  if (!shortcuts) return <div>Loading</div>
  if (error) return <div>Error: {error}</div>

  return (
    <>
      <Head>
        <title>URL Shortener</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Hello Admin</h1>

      <ul>
        {shortcuts &&
          shortcuts.map((shortcut) => (
            <li key={shortcut.code}>
              {shortcut.origin} | {shortcut.count} |{' '}
              <button onClick={() => handleEdit(shortcut.code)}>Editar</button>
              <button onClick={() => handleDelete(shortcut.code)}>
                Excluir
              </button>
              <button onClick={() => handleOpen(shortcut.code)}>Abrir</button>
            </li>
          ))}
      </ul>

      <button onClick={handleSignOut}>Logout</button>
    </>
  )
}
