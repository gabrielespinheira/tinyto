import firebaseAdmin from 'services/firebase/firebase-admin'

export default async (req, res) => {
  const idToken = req.headers.authorization.replace('Bearer ', '')

  firebaseAdmin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      console.log(decodedToken)
      return res.status(200).json({ user: decodedToken })
    })
    .catch((error) => {
      // Handle error
      console.warn(error)
      return res.status(404).json({ error: 'problem with token' })
    })
}
