const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')

const controllers = require('./controllers')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

const app = express()

morgan.token('reqData', request => {
  if (request.method === 'POST') {
    return JSON.stringify(request.body)
  }
  return ' '
})

logger.info(`Connecting to db ${config.MONGODB_URI}`)
mongoose.connect(config.MONGODB_URI)
logger.info(`Connected to db`)

app.use(express.json())

app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :reqData'
  )
)

app.use(
  middleware.asyncHandler(async (request, response, next) => {
    next()
  })
)

app.use('/api/blogs', controllers.blogs)
app.use('/api/users', controllers.users)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
