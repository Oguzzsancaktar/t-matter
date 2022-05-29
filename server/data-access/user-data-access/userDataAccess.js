const User = require('../../models/user')

const createUser = data => {
  return User.create(data)
}

const updateUser = (id, data) => {
  return User.findByIdAndUpdate(id, data, { new: true })
}

module.exports = {
  createUser,
  updateUser
}
