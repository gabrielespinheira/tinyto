import { database } from 'services/firebase'

export default async (req, res) => {
  const param = req.body

  const inserted = await database.collection('links').add({
    origin: param.origin,
    count: 0,
  })

  res
    .status(200)
    .json({ url: `http://${req.headers.host}/link/${inserted.id}` })
}
