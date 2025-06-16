const logger = require('../utils/logger')
const _ = require('lodash')

const dummy = blogs => {
  logger.info('dummy', blogs)
  return 1
}

const totalLikes = blogs => {
  if (blogs.length === 0) return 0

  const init = 0
  const total = blogs.reduce((acc, blog) => acc + blog.likes, init)
  // logger.info('sum of likes:', total)
  return total
}

const favoriteBlog = blogs => {
  if (blogs.length === 0) return {}
  const favorite = blogs.reduce((max, blog) =>
    max.likes < blog.likes ? blog : max
  )
  // logger.info('favorite blog:', favorite)
  return favorite
}

const mostBlogs = blogs => {
  if (blogs.length === 0) return {}

  const authWithMostBlogs = _.chain(blogs)
    .groupBy('author')
    .map((blog, key) => ({ author: key, blogs: blog.length }))
    .maxBy('blogs')
    .value()

  // logger.info('grouped blogs', authWithMostBlogs)
  return authWithMostBlogs
}

const mostLikes = blogs => {
  if (blogs.length === 0) return {}

  const authorWithMostLikes = _.chain(blogs)
    .groupBy('author')
    .map((blog, key) => ({ author: key, likes: _.sumBy(blog, 'likes') }))
    .maxBy('likes')
    .value()

  // logger.info('most likes:', authorWithMostLikes)
  return authorWithMostLikes
}

const validateBlogsIdKey = blogs => {
  if (blogs.length === 0) return true
  const isValidIdKey = blogs.some(blog => '_id' in blog)
  // logger.info('isvalid:', isValidIdKey)
  return isValidIdKey
}

module.exports = {
  dummy,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  totalLikes,
  validateBlogsIdKey,
}
