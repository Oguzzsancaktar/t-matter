const dataAccess = require('../../data-access')
const utils = require('../../utils')
const { StatusCodes } = require('http-status-codes')

const getUserWorkingSchedule = async (req, res) => {
  const { userId } = req.params
  try {
    let workingSchedule = await dataAccess.workingScheduleDataAccess.findWorkingScheduleByUserId(userId)
    if (!workingSchedule) {
      workingSchedule = await dataAccess.workingScheduleDataAccess.findCompanyWorkingSchedule()
    }
    res.status(StatusCodes.OK).json(workingSchedule)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(utils.errorUtils.errorInstance({ message: error.message }))
  }
}

const patchUserWorkingSchedule = async (req, res) => {
  const { userId } = req.params
  const { body } = req
  try {
    const workingSchedule = await dataAccess.workingScheduleDataAccess.findWorkingScheduleByUserId(userId)
    if (!workingSchedule) {
      await dataAccess.workingScheduleDataAccess.createWorkingSchedule({
        owner: userId,
        ...body
      })
      return res.sendStatus(StatusCodes.CREATED)
    }
    await dataAccess.workingScheduleDataAccess.updateWorkingSchedule(workingSchedule._id, body)
    res.sendStatus(StatusCodes.OK)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(utils.errorUtils.errorInstance({ message: error.message }))
  }
}

module.exports = {
  getUserWorkingSchedule,
  patchUserWorkingSchedule
}
