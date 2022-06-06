const User = require('../../models/user')

const createUser = data => {
  return User.create(data)
}

const findByIdAndUpdateUser = (id, data) => {
  return User.findByIdAndUpdate(id, data)
}

const findUserById = id => {
  return User.findById(id).lean().exec()
}

const findUser = (query = {}) => {
  return User.find(query).lean().exec()
}

module.exports = {
  createUser,
  findByIdAndUpdateUser,
  findUserById,
  findUser
}
