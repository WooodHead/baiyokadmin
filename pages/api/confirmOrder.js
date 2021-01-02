import { ObjectId } from 'mongodb'

const { connectToDatabaseUsingCache, addUpdateMeta } = require('../../services/db')

let db = null

export default async (req, res) => {
  db = await connectToDatabaseUsingCache(process.env.NEXT_MONGODB_URI, db)
  const {
    query: { orderId = '' }
  } = req
  console.log('orderId', orderId)
  const result = await db.collection('orders').updateOne({_id: ObjectId(orderId)}, {$set: addUpdateMeta({status: 'preparing'})})
  res.status(200).json(result)
}