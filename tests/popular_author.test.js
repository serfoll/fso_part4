const { test, describe } = require('node:test')
const assert = require('node:assert')
const helper = require('../utils/test_helper')
const testData = require('../utils/test_data')

describe('most popular author', () => {
  test('when list is empty, equals empty object', () => {
    const result = helper.mostLikes([])

    assert.deepStrictEqual(result, {})
  })

  test('when list has single blog, equals single object', () => {
    const result = helper.mostLikes(testData.singleBlog)
    const expect = {
      author: 'Michael Chan',
      likes: 7,
    }
    assert.deepStrictEqual(result, expect)
  })

  test('when list has multiple blogs, equals author with most likes', () => {
    const result = helper.mostLikes(testData.multipleBlogs)
    const expect = { author: 'Edsger W. Dijkstra', likes: 17 }

    assert.deepStrictEqual(result, expect)
  })

  test('when list has multiple blogs with same amount of posts, equals most recent author', () => {
    const result = helper.mostLikes(testData.largeBlogList)
    const expect = { author: 'Michael Chan', likes: 54 }

    assert.deepStrictEqual(result, expect)
  })
})
