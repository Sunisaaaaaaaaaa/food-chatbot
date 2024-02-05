const express = require('express')
const ngrok = require('ngrok')
const routes = require('../src/routes/route')

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 8080

app.use(routes)
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`)
})
