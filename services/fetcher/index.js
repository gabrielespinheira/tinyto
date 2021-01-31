import cookie from 'js-cookie'

const BASE_URL = `${process.env.API_URL}/wp-json/api/v1`

async function fetcher(url) {
  const token = cookie.get('token')

  const response = await fetch(BASE_URL + url, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })

  // not authorized
  /* if (response.status === 403) {
    const error = new Error('Not authorized!')
    error.info = await response.json()
    error.status = response.status
    error.message = 'Not Authorized'

    // redirect to login
    window.location.href = '/login'

    throw error
  } */

  /* if (response.status === 404) {
    const error = new Error('Not found!')
    error.info = await response.json()
    error.status = response.status
    error.message = 'Not found'

    throw error
  } */

  return response.json()
}

export default fetcher
