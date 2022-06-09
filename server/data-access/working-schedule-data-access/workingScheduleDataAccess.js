const WorkingSchedule = require('../../models/workingSchedule')

const createWorkingSchedule = data => {
  return WorkingSchedule.create(data)
}

const updateWorkingSchedule = (id, data) => {
  return WorkingSchedule.findByIdAndUpdate(id, data, { new: true })
}

const findWorkingScheduleByUserId = owner => {
  return WorkingSchedule.findOne({ owner })
}

const findCompanyWorkingSchedule = () => {
  return WorkingSchedule.findOne({ owner: { $exists: false } })
}

module.exports = {
  createWorkingSchedule,
  updateWorkingSchedule,
  findWorkingScheduleByUserId,
  findCompanyWorkingSchedule
}
