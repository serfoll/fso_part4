const logger = require('./logger')

// asyncHandler
const asyncHandler = fn => (request, response, next) => {
  return Promise.resolve(fn(request, response, next)).catch(next)
}

// errorHandler
const errorHandler = (error, request, response, next) => {
  logger.error(error)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }
  next(error)
}

// unknownEndpoint
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

module.exports = { asyncHandler, unknownEndpoint, errorHandler }
