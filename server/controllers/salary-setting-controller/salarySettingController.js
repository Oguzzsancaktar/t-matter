const dataAccess = require('../../data-access')
const utils = require('../../utils')

const createSalarySetting = async (req, res) => {
  const { body } = req
  try {
    const count = await dataAccess.salarySettingDataAccess.findSalarySettingCount()
    if (count) {
      return res.status(400).json(utils.errorUtils.errorInstance({ message: 'You can not create second setting!' }))
    }
    await dataAccess.salarySettingDataAccess.createSalarySetting(body)
    res.sendStatus(201)
  } catch (e) {
    console.log(e)
    res.status(500).json(utils.errorUtils.errorInstance({ message: 'Creation not saved!' }))
  }
}

const updateSalarySetting = async (req, res) => {
  const { body } = req
  try {
    const [salarySetting] = await dataAccess.salarySettingDataAccess.findSalarySetting()
    const newSalarySetting = await dataAccess.salarySettingDataAccess.updateSalarySetting(salarySetting._id, body)
    res.status(200).json(newSalarySetting)
  } catch (e) {
    console.log(e)
    res.status(500).json(utils.errorUtils.errorInstance({ message: 'Creation not saved!' }))
  }
}

const getSalarySetting = async (req, res) => {
  try {
    const [salarySetting] = await dataAccess.salarySettingDataAccess.findSalarySetting()
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
