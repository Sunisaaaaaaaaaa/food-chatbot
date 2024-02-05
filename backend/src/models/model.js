const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Food = new Schema(
  {
    number: Number,
    name: String,
    point: Number,
    count: Number,
  },
  { versionKey: false }
)

const PointReq = new Schema({
  name: String,
  point: Number,
})

const DialogflowReq = new Schema({
  languageCode: String,
  sessionId: String,
  queryText: String,
})


module.exports = { Food }
