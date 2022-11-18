const WorkingSchedule = require('../../models/workingSchedule')

const createWorkingSchedule = data => {
  return WorkingSchedule.create(data)
}

const updateWorkingSchedule = (id, data) => {
  return WorkingSchedule.findByIdAndUpdate(id, data, { new: true })
}

const findWorkingScheduleByUserId = owner => {
  return WorkingSchedule.findOne({ owner }).lean().exec()
}

const findCompanyWorkingSchedule = () => {
  return WorkingSchedule.findOne({ owner: { $eq: null } })
    .lean()
    .exec()
}

const findWorkingScheduleByUserIdOrDefault = async owner => {
  let ws = await WorkingSchedule.findOne({ owner }).lean().exec()
  if (!ws) {
    ws = await findCompanyWorkingSchedule()
  }
  return ws
}

module.exports = {
  createWorkingSchedule,
  updateWorkingSchedule,
  findWorkingScheduleByUserId,
  findCompanyWorkingSchedule,
  findWorkingScheduleByUserIdOrDefault
}
