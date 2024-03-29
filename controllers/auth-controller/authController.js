const dataAccess = require('../../data-access')
const utils = require('../../utils')
const constants = require('../../constants')
const { AUTH_COOKIE_OPTIONS, STATUS_TYPES } = require('../../constants/constants')
const { LOG_TYPES } = require('../../constants/log')

const loginController = async (req, res) => {
  const { body } = req
  const { email, password } = body
  const user = await dataAccess.authDataAccess.findUserByEmail({ email }).exec()

  if (!user) {
    return res.status(400).json(utils.errorUtils.errorInstance({ message: 'User not found' }))
  }

  if (user.status === STATUS_TYPES.INACTIVE) {
    return res.status(400).json(utils.errorUtils.errorInstance({ message: 'User is inactive' }))
  }

  const isPasswordValid = await utils.authUtils.comparePassword({
    plainTextPassword: password,
    hashedPassword: user.password
  })
  if (!isPasswordValid) {
    return res.status(400).json(utils.errorUtils.errorInstance({ message: 'Invalid password' }))
  }

  // const redisClient = new Redis({
  //   url: process.env.UPSTASH_REDIS_REST_URL,
  //   token: process.env.UPSTASH_REDIS_REST_TOKEN
  // })
  // const userArr = await UserHandler.getUsers(redisClient)
  // if (userArr.some(_id => _id === user._id.toString())) {
  //   return res.status(400).json(utils.errorUtils.errorInstance({ message: 'User already logged in' }))
  // }

  const { accessToken, refreshToken } = await utils.authUtils.generateTokens({
    userId: user._id.toString(),
    role: user.role
  })

  await dataAccess.timeLogDataAccess.createTimeLog({ logType: LOG_TYPES.LOGIN, owner: user._id })

  res.cookie(constants.tokenConstants.TOKEN_ACCESS_KEYS.USER_ACCESS_KEY, accessToken, AUTH_COOKIE_OPTIONS)
  res.cookie(constants.tokenConstants.TOKEN_ACCESS_KEYS.USER_REFRESH_KEY, refreshToken, AUTH_COOKIE_OPTIONS)

  res.send({
    userId: user._id.toString(),
    user,
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

const logoutController = async (req, res) => {
  try {
    if (req.query.isCookieNotRemoved !== 'true') {
      res.clearCookie(constants.tokenConstants.TOKEN_ACCESS_KEYS.USER_ACCESS_KEY)
      res.clearCookie(constants.tokenConstants.TOKEN_ACCESS_KEYS.USER_REFRESH_KEY)
    }
    await dataAccess.timeLogDataAccess.createTimeLog({ logType: LOG_TYPES.LOGOUT, owner: req.user.userId })
    res.send({ message: 'Logout successful' })
  } catch (e) {
    console.log(e)
    res.status(500).json(utils.errorUtils.errorInstance({ message: 'Error logging out' }))
  }
}

module.exports = {
  loginController,
  registerController,
  logoutController
}
