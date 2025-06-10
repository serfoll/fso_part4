const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const testData = require('../utils/testData')

test('dummy returns one', () => {
  const result = listHelper.dummy([])

  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('when list is empty, equals 0', () => {
    const result = listHelper.totalLikes([])

    assert.strictEqual(result, 0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(testData.singleBlog)

    assert.strictEqual(result, 7)
  })

  test('when list has multiple blogs, equals the sums likes', () => {
    const result = listHelper.totalLikes(testData.multipleBlogs)

    assert.strictEqual(result, 24)
  })
})

describe('favorite blog', () => {
  test('when list is empty, equals empty object', () => {
    const result = listHelper.favoriteBlog([])

    assert.deepStrictEqual(result, {})
  })

  test('when list is has only one blog, equals single object', () => {
    const result = listHelper.favoriteBlog(testData.singleBlog)
    const expect = testData.singleBlog[0]

    assert.deepStrictEqual(result, expect)
  })

  test('when list has multiple blogs, equals most liked', () => {
    const result = listHelper.favoriteBlog(testData.multipleBlogs)
    const expect = testData.multipleBlogs[2]

    assert.deepStrictEqual(result, expect)
  })

  test('when list has multiple similar likes, equals single most liked', () => {
    const result = listHelper.favoriteBlog(testData.largeBlogList)
    const expect = testData.largeBlogList[3]

    assert.deepStrictEqual(result, expect)
  })
})

describe('author with most posts', () => {
  test('when list is empty, equals empty object', () => {
    const result = listHelper.mostBlogs([])

    assert.deepStrictEqual(result, {})
  })

  test('when list has single blog, equals single author ', () => {
    const result = listHelper.mostBlogs(testData.singleBlog)
    const expect = {
      author: 'Michael Chan',
      blogs: 1,
    }

    assert.deepStrictEqual(result, expect)
  })

  test('when list has multiple blogs, equals author with most blogs', () => {
    const result = listHelper.mostBlogs(testData.multipleBlogs)
    const expect = {
      author: 'Edsger W. Dijkstra',
      blogs: 2,
    }

    assert.deepStrictEqual(result, expect)
  })

  test('when list has multiple blogs with same amount of posts, equals most recent author', () => {
    const result = listHelper.mostBlogs(testData.largeBlogList)
    const expect = { author: 'Michael Chan', blogs: 3 }

    assert.deepStrictEqual(result, expect)
  })
})

describe('author with most likes', () => {
  test('when list is empty, equals empty object', () => {
    const result = listHelper.mostLikes([])

    assert.deepStrictEqual(result, {})
  })

  test('when list has single blog, equals single object', () => {
    const result = listHelper.mostLikes(testData.singleBlog)
    const expect = {
      author: 'Michael Chan',
      likes: 7,
    }
    assert.deepStrictEqual(result, expect)
  })

  test('when list has multiple blogs, equals author with most likes', () => {
    const result = listHelper.mostLikes(testData.multipleBlogs)
    const expect = { author: 'Edsger W. Dijkstra', likes: 17 }

    assert.deepStrictEqual(result, expect)
  })

  test('when list has multiple blogs with same amount of posts, equals most recent author', () => {
    const result = listHelper.mostLikes(testData.largeBlogList)
    const expect = { author: 'Michael Chan', likes: 54 }

    assert.deepStrictEqual(result, expect)
  })
})
