const { test, describe } = require('node:test')
const assert = require('node:assert')
const helper = require('./test_helper')
const testData = require('./test_data')

describe('total likes', () => {
  test('when list is empty, equals 0', () => {
    const result = helper.totalLikes([])

    assert.strictEqual(result, 0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = helper.totalLikes(testData.singleBlog)

    assert.strictEqual(result, 7)
  })

  test('when list has multiple blogs, equals the sums likes', () => {
    const result = helper.totalLikes(testData.multipleBlogs)

    assert.strictEqual(result, 24)
  })
})
