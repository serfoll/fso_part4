const bcrypt = require('bcrypt')
const User = require('../models/user')
const { errorLogger } = require('./middleware')

const ObjectId = require('mongoose').Types.ObjectId

const isValidObjectId = id => {
  if (ObjectId.isValid(id)) {
    if (String(new ObjectId(id)) === id) {
      return true
    }
    return false
  }
  return false
}

const validatePwd = password => {
  const pwdRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&-_+=()!? "]).{8,32}$/

  const isValid = pwdRegex.test(password)
  return isValid
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const hashPwd = async password => {
  if (!validatePwd(password)) {
    errorLogger({
      msg: 'password format invalid',
      name: 'InvalidPasswordError',
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  return passwordHash
}

module.exports = { isValidObjectId, validatePwd, hashPwd, usersInDb }
