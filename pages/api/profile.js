import firebaseAdmin from 'services/firebase/firebase-admin'

export default async (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '')

  if (typeof token === 'undefined') {
    return res.status(401).json({ error: 'Não autorizado' })
  }

  try {
    const user = await firebaseAdmin.auth().verifySessionCookie(token, true)

    return res.status(200).json(user)
  } catch (err) {
    return res.status(400).json({ error: err })
  }
}
