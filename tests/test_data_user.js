const testUsers = [
  {
    username: 'ivylow',
    name: 'Ivy',
    password: 'ivy4_pAss',
  },
  {
    username: 'livley',
    name: 'Lively',
    password: '-l!v3Ly-',
  },

  {
    username: 'harry3',
    name: 'Harry',
    password: 'n3wP4ss?',
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
