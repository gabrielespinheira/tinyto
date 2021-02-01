import firebase from 'services/firebase'

export default async (req, res) => {
  const { code } = req.query

  // UPDATE
  if (req.method === 'PUT') {
    const { origin } = req.body

    // TODO: authorization

    try {
      await firebase.firestore().collection('shortcuts').doc(code).update({
        origin: origin,
      })

      return res.status(200).json({ success: 'Shortcut updated successfully' })
    } catch (err) {
      return res.status(400).json({ error: err })
    }
  }

  // DELETE
  if (req.method === 'DELETE') {
    // TODO: authorization

    try {
      await firebase.firestore().collection('shortcuts').doc(code).delete()

      return res.status(200).json({ success: 'Shortcut deleted successfully' })
    } catch (err) {
      return res.status(400).json({ error: err })
    }
  }

  // READ
  try {
    const shortcut = await firebase
      .firestore()
      .collection('shortcuts')
      .doc(code)
      .get()

    const currentShortcut = shortcut.data()
    const updatedShortcut = {
      ...currentShortcut,
      count: ++currentShortcut.count,
    }

    await firebase
      .firestore()
      .collection('shortcuts')
      .doc(code)
      .set(updatedShortcut)

    return res.status(200).json(updatedShortcut)
  } catch (err) {
    return res.status(400).json({ error: err })
  }
}