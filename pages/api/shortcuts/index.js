import firebase from 'services/firebase'
import firebaseAdmin from 'services/firebase/firebase-admin'

// CREATE
export default async (req, res) => {
  // TODO: authorization

  const { origin } = req.body

  const token = req.headers.authorization?.replace('Bearer ', '')

  if (typeof token === 'undefined') {
    return res.status(401).json({ error: 'Não autorizado' })
  }

  try {
    const user = await firebaseAdmin.auth().verifySessionCookie(token, true)

    const inserted = await firebase.firestore().collection('shortcuts').add({
      origin: origin,
      count: 0,
      user: user.uid,
    })

    return res.status(201).json({
      url: `http://${req.headers.host}/link/${inserted.id}`,
      code: inserted.id,
    })
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Não foi possível realizar a operação.' })
  }
}
