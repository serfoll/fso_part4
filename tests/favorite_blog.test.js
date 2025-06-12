const { test, describe } = require('node:test')
const assert = require('node:assert')
const helper = require('./test_helper')
const testData = require('./test_data')

describe('favorite blog', () => {
  test('when list is empty, equals empty object', () => {
    const result = helper.favoriteBlog([])

    assert.deepStrictEqual(result, {})
  })

  test('when list is has only one blog, equals single object', () => {
    const result = helper.favoriteBlog(testData.singleBlog)
    const expect = testData.singleBlog[0]

    assert.deepStrictEqual(result, expect)
  })

  test('when list has multiple blogs, equals most liked', () => {
    const result = helper.favoriteBlog(testData.multipleBlogs)
    const expect = testData.multipleBlogs[2]

    assert.deepStrictEqual(result, expect)
  })

  test('when list has multiple similar likes, equals single most liked', () => {
    const result = helper.favoriteBlog(testData.largeBlogList)
    const expect = testData.largeBlogList[3]

    assert.deepStrictEqual(result, expect)
  })
})
