const WorkingSchedule = require('../../models/workingSchedule')

const createWorkingSchedule = data => {
  return WorkingSchedule.create(data)
}

const updateWorkingSchedule = (id, data) => {
  return WorkingSchedule.findByIdAndUpdate(id, data, { new: true })
}

module.exports = {
  createWorkingSchedule,
  updateWorkingSchedule
}
