const mongoose = require('mongoose')
require('dotenv').config({ path: '../.env' })

const mongodb = JSON.parse(process.env.MONGODB)

runDB().catch((err) => console.log(err))

async function runDB() {
  const mongoosedb = await mongoose.connect(mongodb.uri, {
    dbName: mongodb.dbname,
  })

  const db = mongoose.connection
  db.on('error', (err) => {
    console.error('MongoDB connection error:', err)
  })
  db.once('open', () => {
    console.log('Connected to MongoDB')
  })

  return mongoosedb
}

module.exports = { runDB }
