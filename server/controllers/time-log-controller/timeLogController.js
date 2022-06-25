const dataAccess = require('../../data-access')
const utils = require('../../utils')
const { StatusCodes } = require('http-status-codes')

const getUserTimeLogs = async (req, res) => {
  const { userId } = req.params
  try {
    await dataAccess.timeLogDataAccess.getLogsByUserId(userId)
    res.status(StatusCodes.OK)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(utils.errorUtils.errorInstance({ message: error.message }))
  }
}

module.exports = {
  getUserTimeLogs
}
