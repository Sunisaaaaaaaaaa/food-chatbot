const express = require('express')
const bot = require('../../config/dialogflow')
const cont = require('../controller/controller')
const { WebhookClient } = require('dialogflow-fulfillment')
const logger = require('../../config/logger')

const router = express.Router()

router.post('/dialogflow', async (req, res) => {
  let languageCode = req.body.languageCode
  let queryText = req.body.queryText
  let sessionId = req.body.sessionId

  let responseData = await bot.detectIntent(languageCode, queryText, sessionId)
  res.send({
    text: responseData.response,
    isFallback: responseData.intent,
    isEnd: responseData.endOfConversation,
  })

  logger.info({
    feature: 'chatbot',
    request: req.body.queryText,
    response: responseData.response,
    status: responseData.intent ? 'error' : 'success',
  })
})

router.get('/randomfood', async (req, res) => {
  try {
    const result = await cont.getRandomFood()
    logger.info({
      feature: 'randomfood',
      request: '',
      response: result,
      status: 'success',
    })
    res.send(result)
  } catch (err) {
    logger.error({
      feature: 'randomfood',
      request: '',
      response: err.message,
      status: 'error',
    })
    if (err.message === 'Document not found') {
      res.status(404).json({ error: 'No food document found' })
    } else {
      res.status(500).json({ error: err.message })
    }
  }
})

router.get('/popfood', async (req, res) => {
  try {
    const result = await cont.getPopularFood()
    logger.info({
      feature: 'popfood',
      request: '',
      response: result,
      status: 'success',
    })
    res.send(result)
  } catch (err) {
    logger.error({
      feature: 'popfood',
      request: '',
      error: err.message,
      status: 'error',
    })
    if (err.message === 'Document not found') {
      res.status(404).json({ error: 'No food document found' })
    } else {
      res.status(500).json({ error: err.message })
    }
  }
})

router.get('/slot', async (req, res) => {
  try {
    let num = req.query.number

    const result = await cont.getFoodBySlot(num)
    logger.info({
      feature: 'slot',
      request: num,
      response: result,
      status: 'success',
    })
    res.send(result)
  } catch (err) {
    logger.error({
      feature: 'slot',
      request: req.query.number,
      response: err.message,
      status: 'error',
    })
    if (err.message === 'Document not found') {
      res.status(404).json({ error: 'No food document found' })
    } else {
      res.status(500).json({ error: err.message })
    }
  }
})

router.post('/updatepoint', async (req, res) => {
  try {
    const foodpoint = { name: req.body.name, point: req.body.point }
    const result = await cont.updateFoodPoint(foodpoint)
    logger.info({
      feature: 'updatepoint',
      request: foodpoint,
      response: result,
      status: 'success',
    })
    res.send(result)
  } catch (err) {
    logger.error({
      feature: 'updatepoint',
      request: req.body,
      response: err.message,
      status: 'error',
    })
    if (err.message === 'Document not found') {
      res.status(404).json({ error: 'No food document found' })
    } else {
      res.status(500).json({ error: err.message })
    }
  }
})

router.post('/webhook', express.json(), async (req, res) => {
  try {
    const agent = new WebhookClient({
      request: req,
      response: res,
    })

    async function rand(agent) {
      const resp = await cont.getRandomFood()
      agent.add(resp.name)
    }

    let intentMap = new Map()
    intentMap.set('คำถาม-อะไรดี', rand)
    agent.handleRequest(intentMap)

    logger.info({
      feature: 'webhook',
      request: '',
      response: '',
      status: 'success',
    })
  } catch (err) {
    logger.error({
      feature: 'webhook',
      request: '',
      response: err.message,
      status: 'error',
    })
    res.status(500).send({ error: err.message })
  }
})

module.exports = router
