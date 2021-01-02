const { connectToDatabaseUsingCache } = require('../../services/db')

let db = null

export default async (req, res) => {
  db = await connectToDatabaseUsingCache(process.env.NEXT_MONGODB_URI, db)
  const count = await db.collection('orders').find({ status: 'open', touched: {$ne: true} }).count()
  res.status(200).json({count})
}
