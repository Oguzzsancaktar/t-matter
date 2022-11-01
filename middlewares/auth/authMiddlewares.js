const jwt = require('jsonwebtoken')
const dataAccess = require('../../data-access')
const { LOG_TYPES } = require('../../constants/log')

const checkAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    req.user = jwt.decode(token, process.env.ACCESS_TOKEN_SECRET)
    const lastLog = await dataAccess.timeLogDataAccess.findLastLog(req.user.userId)
    if (lastLog && lastLog.logType === LOG_TYPES.LOGOUT) {
      dataAccess.timeLogDataAccess.removeTimeLog(lastLog._id)
    }
    next()
  } catch (error) {
    return res.status(401).send({
      message: 'Auth failed'
    })
  }
}

module.exports = {
  checkAuth
}
