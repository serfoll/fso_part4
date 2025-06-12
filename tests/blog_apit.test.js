const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')

const { logger, dbHelpers } = require('../utils')
const Blog = require('../models/blog')
const testData = require('./test_data')
const { validateBlogsIdKey } = require('./blog_test_helper')
const mongoose = require('mongoose')

const api = supertest(app)

describe('blog posts validation', () => {
  beforeEach(async () => {
    logger.info('clean up and add dummy data')
    await Blog.deleteMany({})
    await Blog.insertMany(testData.largeBlogList)
    logger.info('clean up and save done')
  })

  describe('getting blog posts', () => {
    test('blogs are returned as JSON', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-type', /application\/json/)
    })

    test('all blogs are returned', async () => {
      const response = await api.get('/api/blogs')
      assert.strictEqual(response.body.length, testData.largeBlogList.length)
    })

    test('blog id key should not be _id', async () => {
      const response = await api.get('/api/blogs')
      const blogs = response.body

      assert.strictEqual(validateBlogsIdKey(blogs), false)
    })
  })

  describe('saving a new blog post', () => {
    test('new blog post without url or title, should return status 400', async () => {
      await api
        .post('/api/blogs')
        .send(testData.postWithNoUrlOrTitle)
        .expect(400)
    })

    test('new blog post without likes property, likes defaults to 0', async () => {
      const newPost = await api
        .post('/api/blogs')
        .send(testData.postWithNoLikesProp)
        .expect(201)
        .expect('Content-type', /application\/json/)

      const newPostData = newPost.body
      const hasLikes = 'likes' in newPostData && newPostData.likes === 0

      assert.strictEqual(hasLikes, true)
    })

    test('new blog post is saved to DB', async () => {
      const odlBlogs = await api.get('/api/blogs')
      const oldBlogsLength = odlBlogs.body.length

      await api
        .post('/api/blogs')
        .send(testData.dummyBlogPost)
        .expect(201)
        .expect('Content-type', /application\/json/)

      const currentBlogs = await api.get('/api/blogs')
      const currentBlogsData = currentBlogs.body
      assert.strictEqual(currentBlogsData.length, oldBlogsLength + 1)

      const titles = currentBlogsData.map(b => b.title)
      assert(titles.includes(testData.dummyBlogPost.title))
    })
  })

  describe('delete a single post', () => {
    test('delete single post, return 204', { only: true }, async () => {
      const id = testData.singleBlog[0]._id
      const isValidId = dbHelpers.isValideObjectId(id)

      assert.strictEqual(isValidId, true)

      await api.delete(`/api/blogs/${id}`).expect(204)
      const currentBlogs = (await api.get('/api/blogs')).body
      const currentIds = currentBlogs.map(b => b.id)

      assert.strictEqual(currentIds.includes(id), false)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
