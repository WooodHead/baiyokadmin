import { ObjectId } from 'mongodb'

const {
  connectToDatabaseUsingCache,
  addUpdateMeta,
  findNotDeleted,
} = require('../../services/db')

let db = null

export default async (req, res) => {
  db = await connectToDatabaseUsingCache(process.env.NEXT_MONGODB_URI, db)
  const {
    query: { orderId = '', adjustInCents, subTotalInCents, adjustNote },
  } = req
  // 1. update adjustInCents, adjustNote, and totalInCents field in order
  console.log(adjustInCents, subTotalInCents, adjustNote)
  const totalInCents = parseInt(adjustInCents) + parseInt(subTotalInCents)
  console.log(adjustInCents, subTotalInCents, totalInCents)

  const result = await db
    .collection('orders')
    .updateOne(
      { _id: ObjectId(orderId) },
      {
        $set: addUpdateMeta({ adjustInCents: parseInt(adjustInCents), adjustNote, totalInCents: parseInt(totalInCents) }),
      }
    )
  res.status(200).json(result)
}
