import firebaseAdmin from 'services/firebase/firebase-admin'

export default async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: 'Token not provided' })
  }

  const token = req.headers.authorization.replace('Bearer ', '')

  firebaseAdmin
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      console.log(decodedToken)
      return res.status(200).json({ user: decodedToken })
    })
    .catch((error) => {
      // Handle error
      console.warn(error)
      return res.status(401).json({ error: 'Not authorized' })
    })
}
