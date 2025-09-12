const { asyncHandler } = require('../utils/middleware')

const { middleware, logger } = require('../utils')
const router = require('express').Router()

router.get(
  '/',
  asyncHandler(async (request, response) => {
    logger.info('health check...')
    const healthCheck = {
      uptime: process.uptime(),
      status: 'OK',
      timestamp: Date.now(),
    }

    try {
      response.send(healthCheck)
    } catch (error) {
      healthCheck.status = error
      middleware.errorLogger({ msg: healthCheck.status, name: 'ServerDown' })
    }
  })
)

module.exports = router
