const { asyncHandler } = require('../utils/middleware')
const usersRouter = require('express').Router()
const User = require('../models/user')
const { dbHelpers, middleware, logger } = require('../utils')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.post(
  '/',
  asyncHandler(async (request, response) => {
    const { username = null, name = null, password = null } = request.body

    if (password === null) {
      middleware.errorLogger({
        msg: 'password is missing',
        name: 'InvalidPasswordError',
      })
    }

    const passwordHash = await dbHelpers.hashPwd(password)

    const userToSave = new User({
      username,
      name,
      passwordHash,
    })

    const savedUser = await userToSave.save()

    response.status(201).json(savedUser)
  })
)

module.exports = usersRouter
