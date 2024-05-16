const database = require('../../config/database')
const mongoose = require('mongoose')
const model = require('../models/model')
const { error } = require('console')
require('events').EventEmitter.setMaxListeners(0)

const createCollectionsRepo = async (colName, schema) => {
  try {
    const mongoose = await database.runDB()
    const Col = mongoose.model(colName, schema)
    const res = await Col.createCollection()
    return res.collectionName
  } catch (error) {
    throw error
  }
}

const insertDocumentRepo = async (arg) => {
  try {
    const mongoose = await database.runDB()
    const Foods = mongoose.model('Foods', model.Food)

    let total = await Foods.countDocuments()
    let item
    do {
      total++
      item = await queryDocumentRepo({ number: total })
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
    throw error
  }
}

const queryDocumentRepo = async (arg) => {
  try {
    const mongoose = await database.runDB()
    const Foods = mongoose.model('Foods', model.Food)

    const res = await Foods.find(arg)

    if (res[0]) {
      return res[0]
    } else {
      throw new Error('Document not found')
    }
  } catch (error) {
    throw error
  }
}

const queryRandomDocumentRepo = async () => {
  try {
    const mongoose = await database.runDB()
    const Foods = mongoose.model('Foods', model.Food)

    const res = await Foods.aggregate([{ $sample: { size: 1 } }])

    if (res[0]) {
      return res[0]
    } else {
      throw new Error('Document not found')
    }
  } catch (error) {
    throw error
  }
}

const queryPopularDocumentRepo = async () => {
  try {
    const mongoose = await database.runDB()
    const Foods = mongoose.model('Foods', model.Food)

    const res = await Foods.aggregate([
      {
        $group: {
          _id: '$point',
          foods: { $push: '$$ROOT' },
        },
      },
      {
        $sort: { _id: -1 },
      },
      {
        $limit: 3,
      },
    ])

    if (res[0]) {
      const allFoods = res.flatMap((group) => group.foods.map((food) => food))
      const randomIndex = Math.floor(Math.random() * allFoods.length)
      const randomFood = allFoods[randomIndex]

      return randomFood
    } else {
      throw new Error('Document not found')
    }
  } catch (error) {
    throw error
  }
}

const updateDocumentPointRepo = async (arg) => {
  try {
    const mongoose = await database.runDB()
    const Foods = mongoose.model('Foods', model.Food)

    const query = { name: arg.name }
    let item = await Foods.findOne(query)
    if (item == null) {
      item = await Foods({
        name: arg.name,
        point: 0,
        count: 0,
      })
    }

    newCount = item.count + 1
    item.point = (await (item.count * item.point + arg.point)) / newCount
    item.count = newCount

    const res = await item.save()

    if (res) {
      return res
    } else {
      throw new Error('Document not found')
    }
  } catch (error) {
    throw error
  }
}

const queryDocumentByRandNumRepo = async (num) => {
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
      res = await queryDocumentRepo({ number: index })
    } while (!res)

    return res
  } catch (error) {
    throw error
  }
}

const deleteDocumentRepo = async (arg) => {
  try {
    const mongoose = await database.runDB()
    const Foods = mongoose.model('Foods', model.Food)
    const res = await Foods.deleteOne({ name: arg.name }) // returns {deletedCount: 1}

    return res
  } catch (error) {
    throw error
  }
}

const updateDocumentRepo = async (arg) => {
  try {
    const mongoose = await database.runDB()
    const Foods = mongoose.module('Foods', model.Food)

    const food = await Foods.findById(arg.id)

    if (food) {
      food.name = arg.name
      food.point = arg.point
      food.count = arg.count
      const res = await food.save()
      return res
    } else {
      throw new Error('Document not found')
    }
  } catch (error) {
    throw error
  }
}

module.exports = {
  queryDocumentRepo,
  queryRandomDocumentRepo,
  queryPopularDocumentRepo,
  updateDocumentPointRepo,
  queryDocumentByRandNumRepo,
  createCollectionsRepo,
  insertDocumentRepo,
  updateDocumentRepo,
  deleteDocumentRepo,
}
