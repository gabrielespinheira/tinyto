import firebase from 'services/firebase'
import firebaseAdmin from 'services/firebase/firebase-admin'

export default async (req, res) => {
  const { code } = req.query

  // READ
  if (req.method === 'GET') {
    try {
      const shortcut = await firebase
        .firestore()
        .collection('shortcuts')
        .doc(code)
        .get()

      const currentShortcut = shortcut.data()

      const updatedShortcut = {
        origin: currentShortcut.origin,
        count: ++currentShortcut.count,
      }

      await firebase
        .firestore()
        .collection('shortcuts')
        .doc(code)
        .set({ ...updatedShortcut, user: currentShortcut.user })

      return res.status(200).json(updatedShortcut)
    } catch (err) {
      return res
        .status(403)
        .json({ error: 'Não foi possível realizar a operação.' })
    }
  }

  // user token
  const token = req.headers.authorization?.replace('Bearer ', '')

  if (typeof token === 'undefined') {
    return res.status(401).json({ error: 'Não autorizado' })
  }

  const user_token = await firebaseAdmin.auth().verifySessionCookie(token, true)

  // UPDATE
  if (req.method === 'PUT') {
    const { origin } = req.body

    const current_shortcut = await firebase
      .firestore()
      .collection('shortcuts')
      .doc(code)
      .get()

    // check exists
    if (!current_shortcut.data()) {
      return res.status(403).json({ error: 'Not found' })
    }

    const user_owner = current_shortcut.data().user

    // authorization
    if (user_token.uid !== user_owner) {
      return res.status(401).json({ error: 'Not authorized' })
    }

    try {
      await firebase.firestore().collection('shortcuts').doc(code).update({
        origin: origin,
      })

      return res.status(200).json({ success: 'Shortcut updated successfully' })
    } catch (err) {
      return res
        .status(400)
        .json({ error: 'Não foi possível realizar a operação.' })
    }
  }

  // DELETE
  if (req.method === 'DELETE') {
    const current_shortcut = await firebase
      .firestore()
      .collection('shortcuts')
      .doc(code)
      .get()

    // check exists
    if (!current_shortcut.data()) {
      return res.status(403).json({ error: 'Not found' })
    }

    const user_owner = current_shortcut.data().user

    // authorization
    if (user_token.uid !== user_owner) {
      return res.status(401).json({ error: 'Not authorized' })
    }

    try {
      await firebase.firestore().collection('shortcuts').doc(code).delete()

      return res.status(200).json({ success: 'Shortcut deleted successfully' })
    } catch (err) {
      return res
        .status(400)
        .json({ error: 'Não foi possível realizar a operação.' })
    }
  }
}
