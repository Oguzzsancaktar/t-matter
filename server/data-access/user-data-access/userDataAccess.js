const User = require('../../models/user')

const createUser = data => {
  return User.create(data)
}

const findByIdAndUpdateUser = (id, data) => {
  return User.findByIdAndUpdate(id, data)
}

const findUserById = (id, populate = '') => {
  return User.findById(id).populate(populate).lean().exec()
}

const findUser = (query = {}, populate = '') => {
  return User.find(query).populate(populate).sort({ createdAt: -1 }).lean().exec()
}

module.exports = {
  createUser,
  findByIdAndUpdateUser,
  findUserById,
  findUser
}
