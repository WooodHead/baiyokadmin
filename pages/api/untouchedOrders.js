const { connectToDatabaseUsingCache } = require('../../services/db')

let db = null

export default async (req, res) => {
  db = await connectToDatabaseUsingCache(process.env.NEXT_MONGODB_URI, db)
  let start = new Date()
  start.setHours(0, 0, 0, 0)
  let end = new Date()
  end.setHours(23, 59, 59, 999)
  const q = { createdDate: { $gte: start, $lt: end }, status: 'open', touched: {$ne: true} }
  const count = await db.collection('orders').find(q).count()
  res.status(200).json({count})
}
