const dataAccess = require('../../data-access')
const utils = require('../../utils')
const constants = require('../../constants')
const { AUTH_COOKIE_OPTIONS } = require('../../constants/constants')
const { ref } = require('joi')

const loginController = async (req, res) => {
  const { body } = req
  const { email, password } = body
  const user = await dataAccess.authDataAccess.findUserByEmail({ email })
  if (!user) {
    return res.status(400).json(utils.errorUtils.errorInstance({ message: 'User not found' }))
  }
  const isPasswordValid = await utils.authUtils.comparePassword({
    plainTextPassword: password,
    hashedPassword: user.password
  })
  if (!isPasswordValid) {
    return res.status(400).json(utils.errorUtils.errorInstance({ message: 'Invalid password' }))
  }
  const { accessToken, refreshToken } = await utils.authUtils.generateTokens({
    userId: user._id.toString(),
    role: user.role
  })

  await dataAccess.authDataAccess.createRefreshToken({
    user: user._id,
    refreshToken,
    expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
  })

  res.cookie(constants.tokenConstants.TOKEN_ACCESS_KEYS.USER_ACCESS_KEY, accessToken, AUTH_COOKIE_OPTIONS)
  res.cookie(constants.tokenConstants.TOKEN_ACCESS_KEYS.USER_REFRESH_KEY, refreshToken, AUTH_COOKIE_OPTIONS)

  res.send({
    userId: user._id.toString(),
    accessToken,
    refreshToken
  })
}

const registerController = async (req, res) => {
  const { body } = req
  try {
    const user = await dataAccess.authDataAccess.findUserByEmail({ email: body.email })
    if (user) {
      return res.status(400).json(utils.errorUtils.errorInstance({ message: 'User already exists' }))
    }
    const hashedPassword = await utils.authUtils.hashPassword({ plainTextPassword: body.password })
    const newUser = await dataAccess.authDataAccess.createUser({ ...body, password: hashedPassword })
    res.status(201).json({ user: newUser })
  } catch (e) {
    console.log(e)
    res.status(500).json(utils.errorUtils.errorInstance({ message: 'Error creating user' }))
  }
}

const refreshTokenController = async (req, res) => {
  let { refreshToken } = req.body
  if (!refreshToken) {
    res.status(400).json(utils.errorUtils.errorInstance({ message: 'Refresh token required!' }))
    return
  }

  refreshToken = await dataAccess.authDataAccess.findRefreshTokenByRefreshToken({ refreshToken })
  if (!refreshToken) {
    res.status(403).json(utils.errorUtils.errorInstance({ message: 'Refresh token is not in database!' }))
    return
  }

  const { expiryDate, user } = refreshToken
  if (expiryDate.getTime() < new Date().getTime()) {
    res
      .status(403)
      .json(utils.errorUtils.errorInstance({ message: 'Refresh token was expired. Please make a new login request' }))
  }

  const accessToken = await utils.authUtils.generateAccessToken({
    userId: user._id.toString(),
    role: user.role
  })

  res.cookie(constants.tokenConstants.TOKEN_ACCESS_KEYS.USER_ACCESS_KEY, accessToken, AUTH_COOKIE_OPTIONS)

  res.send({
    userId: user._id.toString(),
    accessToken,
    refreshToken: refreshToken.refreshToken
  })
}

module.exports = {
  loginController,
  registerController,
  refreshTokenController
}
