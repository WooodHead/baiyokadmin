const { connectToDatabaseUsingCache, addUpdateMeta } = require('../../services/db')

let db = null

export default async (req, res) => {
  db = await connectToDatabaseUsingCache(process.env.NEXT_MONGODB_URI, db)
  const {
    query: { isClosedShop  }
  } = req
  const isTodayClosed = isClosedShop === 'true'
  const result = await db.collection('tech_configs').updateOne({key: 'onlineShop'}, {$set: addUpdateMeta({isTodayClosed})})
  res.status(200).json(result)
}