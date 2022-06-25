const TimeLog = require('../../models/timeLog')

const createTimeLog = data => {
  return TimeLog.create(data)
}

const getLogsByUserId = userId => {
  return TimeLog.find({ owner: userId }).populate('owner').lean().exec()
}

module.exports = {
  createTimeLog,
  getLogsByUserId
}
