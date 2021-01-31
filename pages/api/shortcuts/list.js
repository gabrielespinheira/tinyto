import firebase from 'services/firebase'
import firebaseAdmin from 'services/firebase/firebase-admin'

export default async (req, res) => {
  const param = req.body

  const token = req.headers.authorization.replace('Bearer ', '')
  const user = await firebaseAdmin.auth().verifyIdToken(token)

  const shortcuts = await firebase
    .firestore()
    .collection('users')
    .doc(user.uid)
    .collection('links')
    .get()

  const list = []

  shortcuts.forEach((shortcut) => {
    list.push({ id: shortcut.id, ...shortcut.data() })
  })

  console.log(list)

  return res.status(200).json(list)
}
