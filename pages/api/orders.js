const { connectToDatabaseUsingCache } = require('../../services/db')

let db = null

export default async (req, res) => {
  db = await connectToDatabaseUsingCache(process.env.NEXT_MONGODB_URI, db)
  const {
    query: { status = '' }
  } = req
  const orders = await db.collection('orders').find({ status: { $regex: `.*${status}.*`, $options: 'i' } }).sort({ createdDate: 1 }).toArray()
  res.status(200).json(orders)
}
