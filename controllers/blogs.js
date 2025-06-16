const { asyncHandler } = require('../utils/middleware')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { logger } = require('../utils')

blogsRouter.get(
  '/',
  asyncHandler(async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {
      username: 1,
      name: 1,
    })

    response.json(blogs)
  })
)

blogsRouter.post(
  '/',
  asyncHandler(async (request, response) => {
    const body = request.body
    const user = await User.findById(body.userId)

    if (!user || user === null) {
      return response
        .status(400)
        .json({ error: 'userId missing or is invalid' })
    }

    delete body.userId

    const blog = new Blog({
      ...body,
      user: user._id,
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  })
)

blogsRouter.delete(
  '/:id',
  asyncHandler(async (request, response) => {
    const { id } = request.params

    await Blog.findByIdAndDelete(id)
    response.status(204).end()
  })
)

blogsRouter.put(
  '/:id',
  asyncHandler(async (request, response) => {
    const { id } = request.params
    const { likes } = request.body
    const result = await Blog.findByIdAndUpdate(id, { likes: likes })

    response.json(result)
  })
)

module.exports = blogsRouter
