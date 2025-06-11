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

describe('getting blogs', () => {
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

  test('blog id key should not be _id', { only: true }, async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body

    assert.strictEqual(validateBlogsIdKey(blogs), false)
  })
})
