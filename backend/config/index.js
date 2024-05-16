const express = require('express')
const routes = require('../src/routes/route')

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 8080

app.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Origin',
    'https://front-for-deploy.onrender.com'
  )
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.use(routes)
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`)
})
