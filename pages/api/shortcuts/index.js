import firebase from 'services/firebase'
import firebaseAdmin from 'services/firebase/firebase-admin'

// CREATE
export default async (req, res) => {
  const { origin } = req.body

  const token = req.headers.authorization.replace('Bearer ', '')
  const user = await firebaseAdmin.auth().verifyIdToken(token)

  const inserted = await firebase.firestore().collection('links').add({
    origin: origin,
    count: 0,
    user: user.uid,
  })

  return res.status(201).json({
    url: `http://${req.headers.host}/link/${inserted.id}`,
    code: inserted.id,
  })
}
