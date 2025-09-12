const { after, test, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const _ = require('lodash')

const mongoose = require('mongoose')

const app = require('../app')
const api = supertest(app)

describe('Check health', () => {
  test.only('health is returned', async () => {
    const result = await api
      .get('/')
      .expect(200)
      .expect('Content-type', /application\/json/)

    const resultBody = result.body
    const resultLength = Object.keys(resultBody).length
    console.log('result:', resultBody)

    assert.strictEqual(resultLength, 3)

    const requiredKeys = ['uptime', 'status', 'timestamp']
    const hasKeys = _.every(requiredKeys, _.partial(_.has, resultBody))
    assert.strictEqual(hasKeys, true)

    assert.strictEqual(resultBody.status, 'OK')
    // console.log('result length:', Object.keys(resultBody).length)
  })
})

after(async () => {
  await mongoose.connection.close()
})
