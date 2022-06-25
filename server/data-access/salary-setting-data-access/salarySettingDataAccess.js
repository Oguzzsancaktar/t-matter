const SalarySetting = require('../../models/salarySetting')

const createSalarySetting = data => {
  return SalarySetting.create(data)
}

const updateSalarySetting = (id, data) => {
  return SalarySetting.findByIdAndUpdate(id, data, { new: true })
}

const findDefaultSalarySettingCount = () => {
  return SalarySetting.find({ owner: { $exists: false } }).countDocuments()
}

const findDefaultSalarySetting = () => {
  return SalarySetting.findOne({ owner: { $exists: false } })
    .select({ 'payrollIncreases._id': 0, __v: 0 })
    .lean()
    .exec()
}

const findSalarySettingByUserId = userId => {
  return SalarySetting.findOne({ owner: userId }).select({ 'payrollIncreases._id': 0, __v: 0 }).lean().exec()
}

const findUserSalarySetting = userId => {
  return SalarySetting.findOne({ owner: userId })
}

module.exports = {
  createSalarySetting,
  updateSalarySetting,
  findDefaultSalarySettingCount,
  findDefaultSalarySetting,
  findSalarySettingByUserId,
  findUserSalarySetting
}
