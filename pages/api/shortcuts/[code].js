import firebase from 'services/firebase'

export default async (req, res) => {
  const { code } = req.query

  // UPDATE
  if (req.method === 'PUT') {
    const { origin } = req.body

    // TODO: authorization

    const updated = await firebase
      .firestore()
      .collection('shortcuts')
      .doc(code)
      .update({
        origin: origin,
      })

    return res.status(200).json({ success: 'Shortcut updated successfully' })
  }

  // DELETE
  if (req.method === 'DELETE') {
    // TODO: authorization

    const deleted = await firebase
      .firestore()
      .collection('shortcuts')
      .doc(code)
      .delete()

    return res.status(200).json({ success: 'Shortcut deleted successfully' })
  }

  // READ
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
}
