const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')

const { logger, dbHelpers } = require('../utils')
const testData = require('./test_data_user')
const mongoose = require('mongoose')
const User = require('../models/user')

const api = supertest(app)

describe('users api validation', () => {
  beforeEach(async () => {
    logger.info('clean up and add dummy data')
    await User.deleteMany({})

    for (let user of [...testData.testUsers]) {
      let newUser = { ...user }
      newUser.passwordHash = await dbHelpers.hashPwd(newUser.password)
      delete newUser.password

      let userObj = new User(newUser)
      await userObj.save()
    }
    logger.info('clean up and add dummy data done')
  })

  describe('get user', () => {
    test('get current users', async () => {
      const result = await api
        .get('/api/users')
        .expect(200)
        .expect('Content-type', /application\/json/)

      assert.strictEqual(result.body.length, testData.testUsers.length)
    })
  })

  describe('create new user', () => {
    test('with missing password, fails with proper status code and message', async () => {
      const currentUsers = await dbHelpers.usersInDb()

      const result = await api
        .post('/api/users')
        .send({ ...testData.singleUserInvalidNoPwd })
        .expect(400)
        .expect('Content-type', /application\/json/)

      const updatedUsers = await dbHelpers.usersInDb()

      assert.strictEqual(
        result.body.error.includes('password is missing'),
        true
      )

      assert.strictEqual(currentUsers.length, updatedUsers.length)
    })

    test('with invalid password format,fails with proper status code and message', async () => {
      const currentUsers = await dbHelpers.usersInDb()

      const result = await api
        .post('/api/users')
        .send({ ...testData.singleUserInvalidPwd })
        .expect(400)
        .expect('Content-type', /application\/json/)

      const updatedUsers = await dbHelpers.usersInDb()

      assert.strictEqual(
        result.body.error.includes('password format invalid'),
        true
      )

      assert.strictEqual(currentUsers.length, updatedUsers.length)
    })

    test('with no username, fails with proper status code and message', async () => {
      const currentUsers = await dbHelpers.usersInDb()
      const userToSave = { ...testData.singleUserInvalidUsername }
      delete userToSave.username

      const result = await api.post('/api/users').send(userToSave).expect(400)

      const updatedUsers = await dbHelpers.usersInDb()

      assert.strictEqual(
        result.body.error.includes('`username` is required.'),
        true
      )

      assert.strictEqual(currentUsers.length, updatedUsers.length)
    })

    test('with invalid username length, fails with proper status code and message', async () => {
      const currentUsers = await dbHelpers.usersInDb()

      const result = await api
        .post('/api/users')
        .send({ ...testData.singleUserInvalidUsername })
        .expect(400)

      const updatedUsers = await dbHelpers.usersInDb()

      assert.strictEqual(
        result.body.error.includes('username') &&
          result.body.error.includes(
            'is shorter than the minimum allowed length (5)'
          ),
        true
      )

      assert.strictEqual(currentUsers.length, updatedUsers.length)
    })

    test('with missing name, fails with proper status code and message', async () => {
      const currentUsers = await dbHelpers.usersInDb()

      const result = await api
        .post('/api/users')
        .send({ ...testData.singleUserInvalidName })
        .expect(400)
        .expect('Content-type', /application\/json/)

      const updatedUsers = await dbHelpers.usersInDb()

      assert.strictEqual(
        result.body.error.includes('`name` is required.'),
        true
      )

      assert.strictEqual(currentUsers.length, updatedUsers.length)
    })

    test('with valid data,succeeds with proper status code', async () => {
      const currentUsers = await dbHelpers.usersInDb()

      const result = await api
        .post('/api/users')
        .send({ ...testData.newUser })
        .expect(201)
        .expect('Content-type', /application\/json/)

      const updatedUsers = await dbHelpers.usersInDb()

      const usernames = updatedUsers.map(u => u.username)

      assert.strictEqual(currentUsers.length + 1, updatedUsers.length)

      assert.strictEqual(usernames.includes(result.body.username), true)
    })

    test('with username already taken, fails with proper status code and message', async () => {
      const currentUsers = await dbHelpers.usersInDb()

      const result = await api
        .post('/api/users')
        .send({ ...testData.testUsers[0] })
        .expect(400)
        .expect('Content-type', /application\/json/)

      const updatedUsers = await dbHelpers.usersInDb()

      logger.info('result.body.error', result.body.error)

      assert.strictEqual(
        result.body.error.includes('expected `username` to be unique'),
        true
      )
      assert.strictEqual(currentUsers.length, updatedUsers.length)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
