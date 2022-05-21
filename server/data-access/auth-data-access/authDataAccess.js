const User = require('../../models/user')
const RefreshToken = require('../../models/refreshToken')

const findUserByEmail = ({ email }) => {
  return User.findOne({ email })
}

const createUser = data => {
  return User.create(data)
}

const findRefreshTokenByRefreshToken = ({ refreshToken }) => {
  return RefreshToken.findOne({ refreshToken }).populate('user')
}

const createRefreshToken = data => {
  return RefreshToken.create(data)
}

module.exports = {
  findUserByEmail,
  createUser,
  findRefreshTokenByRefreshToken,
  createRefreshToken
}
