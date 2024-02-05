const controller = require('../controllers/controller')

const getFoodByKeyRepo = async (arg) => {
  return await controller
    .queryDocument(arg)
    .then((res) => {
      return res
    })
    .catch((err) => {
      throw err
    })
}

const getRandomFoodRepo = async () => {
  return await controller
    .queryRandomDocument()
    .then((res) => {
      return res
    })
    .catch((err) => {
      throw err
    })
}

const getPopularFoodRepo = async () => {
  return await controller
    .queryPopularDocument()
    .then((res) => {
      return res
    })
    .catch((err) => {
      throw err
    })
}

const updateFoodPointRepo = async (arg) => {
  return await controller
    .updateDocumentPoint(arg)
    .then((res) => {
      return res
    })
    .catch((err) => {
      throw err
    })
}

const getFoodBySlotRepo = async (num) => {
  return await controller
    .queryDocumentByRandNum(num)
    .then((res) => {
      return res
    })
    .catch((err) => {
      throw err
    })
}

module.exports = {
  getFoodByKeyRepo,
  getRandomFoodRepo,
  getPopularFoodRepo,
  updateFoodPointRepo,
  getFoodBySlotRepo,
}
