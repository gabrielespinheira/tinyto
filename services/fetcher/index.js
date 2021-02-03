import cookie from 'js-cookie'

const BASE_URL = `/api`

async function fetcher(url) {
  const token = cookie.get('token')

  if (!token) {
    return (window.location.href = '/')
  }

  const response = await fetch(BASE_URL + url, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })

  // not authorized
  if (response.status === 401) {
    window.location.href = '/'
  }

  return response.json()
}

export default fetcher
