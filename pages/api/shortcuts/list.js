import firebase from 'services/firebase'
import firebaseAdmin from 'services/firebase/firebase-admin'

// LIST
export default async (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '')

  if (typeof token === 'undefined') {
    return res.status(401).json({ error: 'Não autorizado' })
  }

  try {
    const user = await firebaseAdmin.auth().verifySessionCookie(token, true)

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
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Não foi possível realizar a operação.' })
  }
}
