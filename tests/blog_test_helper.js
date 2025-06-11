const { logger } = require('../utils')

const validateBlogsIdKey = blogs => {
  if (blogs.length === 0) return true
  const isValidIdKey = blogs.some(blog => '_id' in blog)
  // logger.info('isvalid:', isValidIdKey)
  return isValidIdKey
}

module.exports = { validateBlogsIdKey }
