import cookie from 'js-cookie'

import firebase from 'services/firebase'

const login = async () => {
  const provider = new firebase.auth.GoogleAuthProvider()

  const googleResponse = await firebase.auth().signInWithPopup(provider)

  if (!googleResponse || !googleResponse.user) {
    throw new Error('Não foi possível fazer login com Google')
  }

  const tokenResult = await googleResponse.user.getIdTokenResult()
  cookie.set('token', tokenResult.token)
  cookie.set(
    'user',
    JSON.stringify({
      name: googleResponse.user.displayName,
      email: googleResponse.user.email,
      avatar: googleResponse.user.photoURL,
    })
  )

  return true
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
