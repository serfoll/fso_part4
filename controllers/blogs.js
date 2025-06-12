const { asyncHandler } = require('../utils/middleware')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get(
  '/',
  asyncHandler(async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
  })
)

blogsRouter.post(
  '/',
  asyncHandler(async (request, response) => {
    const blog = new Blog(request.body)
    const result = await blog.save()
    response.status(201).json(result)
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
