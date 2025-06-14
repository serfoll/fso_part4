const { test } = require('node:test')
const assert = require('node:assert')
const helper = require('./test_helper')
const { dbHelpers } = require('../utils')
const userTestData = require('./test_data_user')

test('dummy returns one', () => {
  const result = helper.dummy([])

  assert.strictEqual(result, 1)
})

test('validating password', () => {
  assert.strictEqual(
    dbHelpers.validatePwd(userTestData.singleUserInvalidPwd.password),
    false
  )

  assert.strictEqual(dbHelpers.validatePwd(userTestData.newUser.password), true)
})
