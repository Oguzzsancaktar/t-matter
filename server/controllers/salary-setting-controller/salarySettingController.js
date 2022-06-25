const dataAccess = require('../../data-access')
const utils = require('../../utils')

const createSalarySetting = async (req, res) => {
  const { userId } = req.params
  const { body } = req

  try {
    if (!userId) {
      const count = await dataAccess.salarySettingDataAccess.findDefaultSalarySettingCount()
      if (count) {
        return res.status(400).json(utils.errorUtils.errorInstance({ message: 'You can not create second setting!' }))
      }
    }
    await dataAccess.salarySettingDataAccess.createSalarySetting(userId ? { ...body, owner: userId } : body)
    res.sendStatus(201)
  } catch (e) {
    console.log(e)
    res.status(500).json(utils.errorUtils.errorInstance({ message: 'Creation not saved!' }))
  }
}

const updateSalarySetting = async (req, res) => {
  const { body } = req
  try {
    const newSalarySetting = await dataAccess.salarySettingDataAccess.updateSalarySetting(body._id, body)
    res.status(200).json(newSalarySetting)
  } catch (e) {
    console.log(e)
    res.status(500).json(utils.errorUtils.errorInstance({ message: 'Creation not saved!' }))
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
      res.status(404).json(utils.errorUtils.errorInstance({ message: 'Salary setting not found!' }))
      return
    }
    res.status(200).json(salarySetting)
  } catch (e) {
    console.log(e)
    res.status(500).json(utils.errorUtils.errorInstance({ message: 'internal server error' }))
  }
}

module.exports = {
  createSalarySetting,
  getSalarySetting,
  updateSalarySetting
}
