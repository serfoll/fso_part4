const usersRouter = require('express').Router()

usersRouter.get('/', (request, response) => {
  response.send('<h1>Get users</>')
})

module.exports = usersRouter
