const dataAccess = require('../../data-access')
const utils = require('../../utils')
const { StatusCodes } = require('http-status-codes')

const createSalarySetting = async (req, res) => {
  const { body } = req

  try {
    const count = await dataAccess.salarySettingDataAccess.findDefaultSalarySettingCount()
    if (count) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(utils.errorUtils.errorInstance({ message: 'You can not create second setting!' }))
    }
    await dataAccess.salarySettingDataAccess.createSalarySetting(body)
    res.sendStatus(StatusCodes.CREATED)
  } catch (e) {
    console.log(e)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(utils.errorUtils.errorInstance({ message: 'Creation not saved!' }))
  }
}

const patchUserSalarySetting = async (req, res) => {
  const { userId } = req.params
  const { body } = req
  const userSalarySetting = await dataAccess.salarySettingDataAccess.findUserSalarySetting(userId)
  if (!userSalarySetting) {
    await dataAccess.salarySettingDataAccess.createSalarySetting({ ...body, owner: userId })
    return res.sendStatus(StatusCodes.CREATED)
  }
  await dataAccess.salarySettingDataAccess.updateSalarySetting(userSalarySetting._id, body)
  res.sendStatus(StatusCodes.OK)
  try {
  } catch (e) {
    console.log(e)
    res.status(500).json(utils.errorUtils.errorInstance({ message: 'Creation not saved for user' }))
  }
}

const updateSalarySetting = async (req, res) => {
  const { body } = req
  try {
    const newSalarySetting = await dataAccess.salarySettingDataAccess.updateSalarySetting(body._id, body)
    res.status(StatusCodes.OK).json(newSalarySetting)
  } catch (e) {
    console.log(e)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(utils.errorUtils.errorInstance({ message: 'Creation not saved!' }))
  }
}

const getSalarySetting = async (req, res) => {
  const { userId } = req.params
  try {
    let salarySetting = await dataAccess.salarySettingDataAccess.findSalarySettingByUserId(userId)
    if (!salarySetting) {
      salarySetting = await dataAccess.salarySettingDataAccess.findDefaultSalarySetting()
    }
    if (!salarySetting) {
      res.status(StatusCodes.NOT_FOUND).json(utils.errorUtils.errorInstance({ message: 'Salary setting not found!' }))
      return
    }
    res.status(200).json(salarySetting)
  } catch (e) {
    console.log(e)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(utils.errorUtils.errorInstance({ message: 'internal server error' }))
  }
}

module.exports = {
  createSalarySetting,
  getSalarySetting,
  updateSalarySetting,
  patchUserSalarySetting
}
