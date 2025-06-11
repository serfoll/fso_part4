const { test } = require('node:test')
const assert = require('node:assert')
const helper = require('../utils/test_helper')

test('dummy returns one', () => {
  const result = helper.dummy([])

  assert.strictEqual(result, 1)
})
