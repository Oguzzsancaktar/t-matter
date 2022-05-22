const SalarySetting = require('../../models/salarySetting')

const createSalarySetting = data => {
  return SalarySetting.create(data)
}

const updateSalarySetting = (id, data) => {
  return SalarySetting.findByIdAndUpdate(id, data, { new: true })
}

const findSalarySettingCount = () => {
  return SalarySetting.countDocuments()
}

const findSalarySetting = () => {
  return SalarySetting.find().lean().exec()
}

module.exports = {
  createSalarySetting,
  updateSalarySetting,
  findSalarySettingCount,
  findSalarySetting
}
