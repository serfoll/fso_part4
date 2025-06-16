const testUsers = [
  {
    username: 'ivylow',
    name: 'Ivy',
    password: 'ivy4_pAss',
    blogs: [],
    _id: '684c9a518cd40d0378fbaefd',
    __v: 0,
  },
  {
    _id: '684f6203f4010ed6748adda8',
    username: 'livley',
    name: 'Lively',
    password: '-l!v3Ly-',
    blogs: [],
    __v: 0,
  },

  {
    _id: '684f6203f4010ed6748addaa',
    username: 'harry3',
    name: 'Harry',
    password: 'n3wP4ss?',
    blogs: [],
    __v: 0,
  },
]

const newUser = {
  username: 'livesess',
  name: 'live Sess',
  password: 'l!v3_sE3ss',
}

const singleUserInvalidPwd = {
  username: 'livesess',
  name: 'live Sess',
  password: 'passwordislong',
}

const singleUserInvalidNoPwd = {
  username: 'livesess',
  name: 'live Sess',
}

const singleUserInvalidUsername = {
  username: 'liv',
  name: 'live Sess',
  password: 'str0ng_P4ass1',
}

const singleUserInvalidName = {
  username: 'livess',
  password: 'str0ng_P4ass1',
}

module.exports = {
  newUser,
  singleUserInvalidName,
  singleUserInvalidPwd,
  singleUserInvalidNoPwd,
  singleUserInvalidUsername,
  testUsers,
}
