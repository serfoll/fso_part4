const { test, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')

const logger = require('../utils/logger')
const Blog = require('../models/blog')
const testData = require('./test_data')
const { validateBlogsIdKey } = require('./blog_test_helper')

const api = supertest(app)

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

describe('saving blog posts', () => {
  test('new blog post is saved to DB', { only: true }, async () => {
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
