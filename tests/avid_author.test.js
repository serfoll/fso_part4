const { test, describe } = require('node:test')
const assert = require('node:assert')
const helper = require('../utils/test_helper')
const testData = require('../utils/test_data')

describe('author with most posts', () => {
  test('when list is empty, equals empty object', () => {
    const result = helper.mostBlogs([])

    assert.deepStrictEqual(result, {})
  })

  test('when list has single blog, equals single author ', () => {
    const result = helper.mostBlogs(testData.singleBlog)
    const expect = {
      author: 'Michael Chan',
      blogs: 1,
    }

    assert.deepStrictEqual(result, expect)
  })

  test('when list has multiple blogs, equals author with most blogs', () => {
    const result = helper.mostBlogs(testData.multipleBlogs)
    const expect = {
      author: 'Edsger W. Dijkstra',
      blogs: 2,
    }

    assert.deepStrictEqual(result, expect)
  })

  test('when list has multiple blogs with same amount of posts, equals most recent author', () => {
    const result = helper.mostBlogs(testData.largeBlogList)
    const expect = { author: 'Michael Chan', blogs: 3 }

    assert.deepStrictEqual(result, expect)
  })
})
