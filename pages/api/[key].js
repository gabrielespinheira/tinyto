import { database } from 'services/firebase'

export default async (req, res) => {
  const {
    query: { key },
  } = req

  const shortcut = await database
    .collection('users')
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

      await database.collection('users').doc(key).set(updatedShortcut)

      return updatedShortcut
    })
    .catch((err) => {
      console.log('Error getting document', err)
    })

  res.status(200).json(shortcut)
}
