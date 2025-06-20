const singleBlog = {
  _id: '5a422a851b54a676234d17f7',
  title: 'React patterns',
  author: 'Michael Chan',
  url: 'https://reactpatterns.com/',
  likes: 7,
  userId: '684c9a518cd40d0378fbaefd',
  __v: 0,
}

const dummyBlogPost = {
  title: 'Cursor on mobile is coming',
  author: 'Ryo Lu',
  url: 'https://x.com/ryolu_/status/1932103168743346211?s=46&t=9L7AsLwZ88tYxgl351Rs1A',
  likes: 64,
}

const postWithNoLikesProp = {
  title: 'Tech Skills That Will Survive AI Automation',
  author: 'Tiff In Tech',
  url: 'https://www.youtube.com/watch?v=XsInbjsGrBM',
  userId: '684c9a518cd40d0378fbaefd',
}

const postWithNoUrlOrTitle = {
  author: 'Tiff In Tech',
  userId: '684f6203f4010ed6748adda8',
}

const postWithNoUserId = {
  author: 'Tiff In Tech',
}

const postToUpdate = {
  id: '5a422aa71b54a676234d17f8',
  title: 'Go To Statement Considered Harmful',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  likes: 30,
  user: {
    id: '684c9a518cd40d0378fbaefd',
    name: 'Ivy',
    username: 'ivylow',
  },
}

const multipleBlogs = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
]

const largeBlogList = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 0,
    user: '684c9a518cd40d0378fbaefd',
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    user: '684f6203f4010ed6748adda8',
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 30,
    user: '684f6203f4010ed6748adda8',
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 12,
    user: '684f6203f4010ed6748adda8',
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 12,
    user: '684f6203f4010ed6748addaa',
    __v: 0,
  },
  {
    _id: '4a422a870c54a676234d17f7',
    title: 'React Native Tips',
    author: 'Michael Chan',
    url: 'https://reactnativetips.com/react-native-design-patterns-best-practices/',
    likes: 30,
    user: '684f6203f4010ed6748addaa',
    __v: 0,
  },
  {
    _id: '5a422a851b54a671234d17f7',
    title: 'Chan talks',
    author: 'Michael Chan',
    url: 'https://chan.dev/talks/',
    likes: 12,
    user: '684f6203f4010ed6748addaa',
    __v: 0,
  },
]

module.exports = {
  dummyBlogPost,
  largeBlogList,
  multipleBlogs,
  postToUpdate,
  postWithNoLikesProp,
  postWithNoUrlOrTitle,
  postWithNoUserId,
  singleBlog,
}
