import firebase from 'services/firebase'
import firebaseAdmin from 'services/firebase/firebase-admin'

export default async (req, res) => {
  const { code } = req.query

  const token = req.headers.authorization.replace('Bearer ', '')
  const user = await firebaseAdmin.auth().verifyIdToken(token)

  const shortcut = await firebase
    .firestore()
    .collection('users')
    .doc(user.uid)
    .collection('links')
    .doc(code)
    .get()

  const currentShortcut = shortcut.data()
  const updatedShortcut = {
    ...currentShortcut,
    count: ++currentShortcut.count,
  }

  await firebase.firestore().collection('links').doc(code).set(updatedShortcut)

  return res.status(200).json(updatedShortcut)
}
