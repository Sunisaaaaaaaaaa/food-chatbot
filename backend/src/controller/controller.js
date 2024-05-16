const repo = require('../repository/repository')

const getFoodByKey = async (arg) => {
  return await repo
    .queryDocumentRepo(arg)
    .then((res) => {
      return res
    })
    .catch((err) => {
      throw err
    })
}

const getRandomFood = async () => {
  return await repo
    .queryRandomDocumentRepo()
    .then((res) => {
      return res
    })
    .catch((err) => {
      throw err
    })
}

const getPopularFood = async () => {
  return await repo
    .queryPopularDocumentRepo()
    .then((res) => {
      return res
    })
    .catch((err) => {
      throw err
    })
}

const updateFoodPoint = async (arg) => {
  return await repo
    .updateDocumentPointRepo(arg)
    .then((res) => {
      return res
    })
    .catch((err) => {
      throw err
    })
}

const getFoodBySlot = async (num) => {
  return await repo
    .queryDocumentByRandNumRepo(num)
    .then((res) => {
      return res
    })
    .catch((err) => {
      throw err
    })
}

module.exports = {
  getFoodByKey,
  getRandomFood,
  getPopularFood,
  updateFoodPoint,
  getFoodBySlot,
}
