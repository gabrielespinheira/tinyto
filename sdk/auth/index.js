import cookie from 'js-cookie'
import axios from 'axios'

import firebase from 'services/firebase'

const login = async () => {
  const provider = new firebase.auth.GoogleAuthProvider()

  try {
    const googleResponse = await firebase.auth().signInWithPopup(provider)

    if (!googleResponse || !googleResponse.user) {
      throw new Error('Não foi possível fazer login com Google')
    }

    const googleToken = await googleResponse.user.getIdTokenResult()

    const response = await axios.post(`/api/login`, {
      token: googleToken.token,
    })

    // Set session expiration to 8 hours
    cookie.set('token', response.data.token, { expires: 1 / 3 })
    cookie.set(
      'user',
      JSON.stringify({
        name: googleResponse.user.displayName,
        email: googleResponse.user.email,
        avatar: googleResponse.user.photoURL,
      }),
      { expires: 1 / 3 }
    )

    return true
  } catch (err) {
    throw new Error(err.message)
  }
}

const logout = async () => {
  await cookie.remove('token')
  await cookie.remove('user')

  return true
}

const isLogged = () => {
  const token = cookie.get('token')

  if (typeof token === 'undefined') {
    return false
  }

  return true
}

export { login, logout, isLogged }
