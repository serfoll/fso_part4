const { after, beforeEach, describe, test } = require('node:test')
const assert = require('node:assert')
const jwt = require('jsonwebtoken')
const supertest = require('supertest')
const mongoose = require('mongoose')

const app = require('../app')
const { logger, dbHelpers } = require('../utils')
const userTestData = require('./test_data_user')
const loginTestData = require('./login_test_data')
const User = require('../models/user')

const api = supertest(app)

describe('user login', () => {
  beforeEach(async () => {
    logger.info('clean up and add dummy data')
    await User.deleteMany({})

    for (let user of [...userTestData.testUsers]) {
      let newUser = { ...user }
      newUser.passwordHash = await dbHelpers.hashPwd(newUser.password)
      delete newUser.password

      let userObj = new User(newUser)
      await userObj.save()
    }
    logger.info('clean up and add dummy data done')
  })

  test('user login with missing username, return proper status code and message', async () => {
    await api.post('/api/login').send({ password: 'password' }).expect(400)
  })

  test('user login with missing password, return proper status code and message', async () => {
    await api.post('/api/login').send({ username: 'username' }).expect(400)
  })

  test('user login with no credentials, return proper status code and message', async () => {
    await api.post('/api/login').send({ username: 'username' }).expect(400)
  })

  test('user login with invalid credentials, return proper status code and message', async () => {
    await api.post('/api/login').send(loginTestData.invalidLogin).expect(404)
  })

  test('user login with valid credentials, return proper status code and data', async () => {
    const reqData = loginTestData.validLogin

    const response = await api
      .post('/api/login')
      .send(reqData)
      .expect(200)
      .expect('Content-type', /application\/json/)

    const { body } = response

    assert.strictEqual(typeof body.token, 'string')
    assert.ok(body.token.length > 0)

    const decodedToken = await jwt.verify(body.token, process.env.JWT_SECRET)

    assert.strictEqual(decodedToken.username, reqData.username)
  })
})

after(async () => {
  await mongoose.connection.close()
})
