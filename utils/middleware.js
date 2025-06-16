const logger = require('./logger')

// asyncHandler
const asyncHandler = fn => (request, response, next) => {
  return Promise.resolve(fn(request, response, next)).catch(next)
}

// errorHandler
const errorHandler = (error, request, response, next) => {
  logger.error(error)

  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'InvalidPasswordError') {
    return response.status(400).json({ error: error.message })
  } else if (
    error.name === 'MongoServerError' &&
    error.message.includes('E11000 duplicate key error')
  ) {
    return response
      .status(400)
      .json({ error: 'expected `username` to be unique' })
  } else if (error.name === 'InvalidUserId') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

// errorLogger
const errorLogger = error => {
  const newError = new Error(error.msg)
  newError.name = error.name

  throw newError
}

// unknownEndpoint
const unknownEndpoint = (request, response) => {
  response.status(404).json({ error: 'unknown endpoint' })
}

module.exports = { asyncHandler, errorHandler, errorLogger, unknownEndpoint }
