const logger = require('./logger')

const dummy = blogs => {
  logger.info('dummy', blogs)
  return 1
}

const totalLikes = blogs => {
  const init = 0
  const total = blogs.length > 0 ? blogs.reduce((acc, blog) => acc + blog.likes, init) : 0
  logger.info('sum of likes:', total)
  return total
}

const favoriteBlog = blogs => {
  if (blogs.length === 0) return {}
  const favorite = blogs.reduce((max, blog) => (max.likes < blog.likes ? blog : max))
  logger.info('favorite blog:', favorite)
  return favorite
}

module.exports = {
  dummy,
  favoriteBlog,
  totalLikes,
}
