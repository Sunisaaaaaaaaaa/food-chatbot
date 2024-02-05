const { default: mongoose } = require('mongoose')
const database = require('../../config/database')
const model = require('../models/model')
require('events').EventEmitter.setMaxListeners(0)

const createCollections = async (colName, schema) => {
  try {
    const mongoose = await database.runDB()
    const Col = mongoose.model(colName, schema)
    const res = await Col.createCollection()
    return res.collectionName
  } catch (error) {
    return error
  } finally {
    mongoose.connection.close()
  }
}

const insertDocument = async (arg) => {
  try {
    const mongoose = await database.runDB()
    const Foods = mongoose.model('Foods', model.Food)

    let total = await Foods.countDocuments()
    let item
    do {
      total++
      item = await queryDocument({ number: total })
    } while (item)

    arg = {
      number: total,
      name: arg.name,
      point: arg.point,
      count: arg.count,
    }

    const food = new Foods(arg)
    const res = await food.save()

    return res
  } catch (error) {
    return error
  } finally {
    mongoose.connection.close()
  }
}

// insertDocument({ name: 'ไม่รู้', point: 0, count: 0 })

const queryDocument = async (arg) => {
  try {
    const mongoose = await database.runDB()
    const Foods = mongoose.model('Foods', model.Food)

    const res = await Foods.find(arg)

    if (res[0]) {
      // console.log('Found document:', result[0])
      return res[0]
    } else {
      console.log('Document not found')
    }
  } catch (error) {
    // console.error('Error finding document:', error)
    return error
  }
}

const queryRandomDocument = async () => {
  try {
    const mongoose = await database.runDB()
    const Foods = mongoose.model('Foods', model.Food)

    const res = await Foods.aggregate([{ $sample: { size: 1 } }])

    if (res[0]) {
      return res[0]
    } else {
      console.log('Document not found')
    }
  } catch (error) {
    // console.error('Error finding document:', error)
    return error
  }
}

const queryPopularDocument = async () => {
  try {
    const mongoose = await database.runDB()
    const Foods = mongoose.model('Foods', model.Food)

    const res = await Foods.aggregate([
      {
        $sort: { point: -1 },
      },
      {
        $limit: 1,
      },
    ])

    if (res[0]) {
      return res[0]
    } else {
      console.log('Document not found')
    }
  } catch (error) {
    // console.error('Error finding document:', error)
    return error
  }
}

const updateDocumentPoint = async (arg) => {
  try {
    const query = { name: arg.name }
    let item = await queryDocument(query)
    if (!item) {
      item = await insertDocument({
        name: arg.name,
        point: 0,
        count: 0,
      })
    }

    newcount = (await item.count) + 1
    newpoint = (await (item.count * item.point + arg.point)) / newcount

    const mongoose = await database.runDB()
    const Foods = mongoose.model('Foods', model.Food)
    const food = await Foods.findById(item.id)
    food.point = newpoint
    food.count = newcount
    const res = await food.save()

    if (res) {
      return res
    } else {
      console.log('Document not found')
    }
  } catch (error) {
    // console.error('Error finding document:', error)
    return error
  }
}

const queryDocumentByRandNum = async (num) => {
  try {
    const prime = [
      1, 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67,
      71, 73, 79, 83, 89, 97,
    ]

    const mongoose = await database.runDB()
    const Foods = mongoose.model('Foods', model.Food)
    const total = await Foods.countDocuments()

    let res, random, index
    do {
      random = Math.floor(Math.random() * prime.length)
      index = num * prime[random]
      if (index > total) {
        index = index % total
      }
      res = await queryDocument({ number: index })
    } while (!res)

    return res
  } catch (error) {
    // console.error('Error finding document:', error)
    return error
  }
}

const deleteDocument = async (arg) => {
  try {
    const mongoose = await database.runDB()
    const Foods = mongoose.model('Foods', model.Food)
    const res = await Foods.deleteOne({ name: arg.name }) // returns {deletedCount: 1}

    return res
  } catch (error) {
    return error
  }
}

const updateDocument = async (arg) => {
  try {
    const mongoose = await database.runDB()
    const Foods = mongoose.module('Foods', model.Food)

    const food = await Foods.findById(arg.id)
    food.name = arg.name
    food.point = arg.point
    food.count = arg.count
    const res = await food.save()

    return res
  } catch (error) {
    return error
  }
}

module.exports = {
  queryDocument,
  queryRandomDocument,
  queryPopularDocument,
  updateDocumentPoint,
  queryDocumentByRandNum,
  createCollections,
  insertDocument,
  updateDocument,
  deleteDocument,
}
