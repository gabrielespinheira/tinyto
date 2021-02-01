import firebaseAdmin from 'services/firebase/firebase-admin'

export default async (req, res) => {
  const { token } = req.body

  if (!token) {
    return res.status(401).json({ error: 'Token not provided' })
  }

  // Set session expiration to 8 hours
  const expiresIn = 60 * 60 * 8 * 1 * 1000

  try {
    const idToken = await firebaseAdmin.auth().verifyIdToken(token)

    // 5 minutes to get token
    if (!(new Date().getTime() / 1000 - idToken.auth_time < 5 * 60)) {
      return res.status(401).json({ error: 'Token expired' })
    }

    const jwt = await firebaseAdmin
      .auth()
      .createSessionCookie(token, { expiresIn })

    return res.status(200).json({ token: jwt })
  } catch (err) {
    return res.status(401).json({ error: 'Not authorized' })
  }
}
