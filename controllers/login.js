const { asyncHandler } = require('../utils/middleware')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/user')
const { middleware, logger } = require('../utils')
const loginRouter = require('express').Router()

loginRouter.post(
  '/',
  asyncHandler(async (request, response) => {
    const { username = null, password = null } = request.body

    if (!username || username === null) {
      middleware.errorLogger({
        msg: 'no username provided',
        name: 'MissingUsername',
      })
    }

    if (!password || password === null) {
      middleware.errorLogger({
        msg: 'no password provided',
        name: 'MissingPassword',
      })
    }

    const user = await User.findOne({ username })

    if (!user) {
      middleware.errorLogger({
        msg: 'no user found',
        name: 'MissingUser',
      })
    }

    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
      middleware.errorLogger({
        msg: 'InvalidCredentials',
        name: 'invalid username or password',
      })
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    }

    const token = jwt.sign(userForToken, process.env.JWT_SECRET)
    logger.info('users name:', user.name)
    response
      .status(200)
      .send({ token, username: user.username, name: user.name })
  })
)

module.exports = loginRouter
