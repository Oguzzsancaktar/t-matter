const User = require('../../models/user')

const findUserByEmail = ({ email }) => {
  return User.findOne({ email })
}

const createUser = data => {
  console.log(data)
  return User.create(data)
}

module.exports = {
  findUserByEmail,
  createUser
}
