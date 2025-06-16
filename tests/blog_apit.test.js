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

  describe.only('getting blog posts', () => {
    test('blogs are returned as JSON', async () => {
      const result = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-type', /application\/json/)

      const resultBody = result.body
      const users = resultBody.map(b => b?.user)
      logger.info(users)
      assert.strictEqual(result.body.length, testData.largeBlogList.length)
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

      const savedBlog = await api
        .post('/api/blogs')
        .send(testData.singleBlog)
        .expect(201)
        .expect('Content-type', /application\/json/)

      assert.strictEqual(savedBlog.body.user, testData.singleBlog.userId)

      const currentBlogs = await api.get('/api/blogs')
      const currentBlogsData = currentBlogs.body
      assert.strictEqual(currentBlogsData.length, oldBlogsLength + 1)

      const blogTitles = currentBlogsData.map(blog => blog.title)
      assert(blogTitles.includes(testData.singleBlog.title))

      const blogUsers = currentBlogsData.map(blog => blog?.user?.id)
      assert.strictEqual(blogUsers.includes(testData.singleBlog.userId), true)

      const userInDb = await api.get(`/api/users/${testData.singleBlog.userId}`)
      const userInDbBlogs = userInDb.body.blogs
      assert.strictEqual(userInDbBlogs.includes(testData.singleBlog._id), true)
    })
  })

  describe('deleting post', () => {
    test('delete a post, returns 204', async () => {
      const id = testData.singleBlog._id
      const isValidId = dbHelpers.isValidObjectId(id)

      assert.strictEqual(isValidId, true)

      await api.delete(`/api/blogs/${id}`).expect(204)
      const currentBlogs = (await api.get('/api/blogs')).body
      const currentIds = currentBlogs.map(b => b.id)

      assert.strictEqual(currentIds.includes(id), false)
    })
  })

  describe('update post', () => {
    test('updating a post, returns json', async () => {
      const id = testData.postToUpdate.id
      const isValidId = dbHelpers.isValidObjectId(id)

      assert.strictEqual(isValidId, true)

      await api
        .put(`/api/blogs/${id}`)
        .send({ likes: testData.postToUpdate.likes })
        .expect(200)
        .expect('Content-type', /application\/json/)

      const updatePosts = (await api.get('/api/blogs')).body
      const updatedPost = updatePosts.find(p => p.id === id)

      assert.deepStrictEqual(updatedPost, testData.postToUpdate)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
