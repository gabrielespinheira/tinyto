import { database } from 'services/firebase'

export default async (req, res) => {
  const param = req.body

  const inserted = await database.collection('users').add({
    origin: param.origin,
    count: 0,
  })

  res.status(200).json({ id: inserted.id })
}
