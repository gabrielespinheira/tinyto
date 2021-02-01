import firebase from 'services/firebase'
import firebaseAdmin from 'services/firebase/firebase-admin'

// LIST
export default async (req, res) => {
  const token = req.headers.authorization.replace('Bearer ', '')
  const user = await firebaseAdmin.auth().verifyIdToken(token)

  const shortcuts = await firebase
    .firestore()
    .collection('shortcuts')
    .where('user', '==', user.uid)
    .get()

  const list = []

  shortcuts.forEach((shortcut) => {
    list.push({ code: shortcut.id, ...shortcut.data() })
  })

  return res.status(200).json(list)
}
