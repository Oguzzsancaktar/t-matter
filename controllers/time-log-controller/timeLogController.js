const dataAccess = require('../../data-access')
const utils = require('../../utils')
const { StatusCodes } = require('http-status-codes')

const getUserTimeLogs = async (req, res) => {
  const { userId } = req.params
  const { timeOffSet, startDate, endDate } = req.query
  try {
    const timeLogs = await dataAccess.timeLogDataAccess.getLogsByUserId({
      userId,
      timeOffSet: +timeOffSet,
      startDate,
      endDate
    })
    res.status(StatusCodes.OK).send(timeLogs)
  } catch (error) {
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(utils.errorUtils.errorInstance({ message: error.message }))
  }
}

module.exports = {
  getUserTimeLogs
}
