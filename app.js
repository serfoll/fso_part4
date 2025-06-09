const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')

const controllers = require('./controllers')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

const app = express()

morgan.token('reqData', function (req) {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
  return ' '
})

logger.info(`Connecting to db ${config.MONGODB_URI}`)
mongoose.connect(config.MONGODB_URI)

app.use(express.json())

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :reqData'))

app.use('/api/blogs', controllers.blogs)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
