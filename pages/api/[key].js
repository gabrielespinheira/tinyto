import firebase from 'services/firebase'

export default async (req, res) => {
  const {
    query: { key },
  } = req

  const shortcut = await firebase
    .firestore()
    .collection('links')
    .doc(key)
    .get()
    .then(async (doc) => {
      if (!doc.exists) {
        console.log('No such document!')
        return false
      }

      const currentShortcut = doc.data()
      const updatedShortcut = {
        ...currentShortcut,
        count: ++currentShortcut.count,
      }

      await firebase
        .firestore()
        .collection('links')
        .doc(key)
        .set(updatedShortcut)

      return updatedShortcut
    })
    .catch((err) => {
      console.log('Error getting document', err)
    })

  res.status(200).json(shortcut)
}
