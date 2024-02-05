const express = require('express')
const bot = require('../../config/dialogflow')
const repo = require('../repository/repository')
const { WebhookClient } = require('dialogflow-fulfillment')

const router = express.Router()

router.post('/dialogflow', async (req, res) => {
  let languageCode = req.body.languageCode
  let queryText = req.body.queryText
  let sessionId = req.body.sessionId

  let responseData = await bot.detectIntent(languageCode, queryText, sessionId)
  res.send({ text: responseData.response })
})

router.get('/randomfood', async (req, res) => {
  res.send(
    await repo
      .getRandomFoodRepo()
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  )
})

router.get('/popfood', async (req, res) => {
  res.send(
    await repo
      .getPopularFoodRepo()
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  )
})

router.get('/slot', async (req, res) => {
  let num = req.body.number

  res.send(
    await repo
      .getFoodBySlotRepo(num)
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  )
})

router.post('/updatepoint', async (req, res) => {
  let foodpoint = { name: req.body.name, point: req.body.point }

  res.send(
    await repo
      .updateFoodPointRepo(foodpoint)
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  )
})

router.post('/webhook', express.json(), async (req, res) => {
  const agent = new WebhookClient({
    request: req,
    response: res,
  })

  async function rand(agent) {
    const resp = await repo
      .getRandomFoodRepo()
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
    agent.add(resp.name)
  }
  let intentMap = new Map()

  intentMap.set('คำถาม-อะไรดี', rand)
  agent.handleRequest(intentMap)
})

module.exports = router
