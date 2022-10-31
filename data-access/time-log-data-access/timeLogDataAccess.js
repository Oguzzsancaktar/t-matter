const TimeLog = require('../../models/timeLog')
const mongoose = require('mongoose')
const { LOG_TYPES } = require('../../constants/log')
const moment = require('moment')

const createTimeLog = data => {
  return TimeLog.create(data)
}

const getLogsByUserId = async userId => {
  const timeLogs = await TimeLog.aggregate([
    { $match: { owner: mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        logs: {
          $push: '$$ROOT'
        }
      }
    }
  ]).exec()

  return timeLogs.reduce((acc, curr) => {
    const { _id, logs } = curr
    const logouts = logs.filter(log => log.logType === LOG_TYPES.LOGOUT).sort((a, b) => a.createdAt - b.createdAt)
    const logins = logs.filter(log => log.logType === LOG_TYPES.LOGIN).sort((a, b) => a.createdAt - b.createdAt)

    const totalTime = logins.reduce((acc, curr, i) => {
      if (logouts[i]) {
        return acc + moment(moment(logouts[i].createdAt)).diff(curr.createdAt, 'seconds')
      }
      return acc
    }, 0)

    acc.push({
      date: _id,
      totalTime,
      login: logins[0]?.createdAt || logins[logins.length - 1]?.createdAt || moment(),
      logout: logouts[logouts.length - 1] ? logouts[logouts.length - 1].createdAt : logins[logins.length - 1].createdAt
    })
    return acc
  }, [])
}

module.exports = {
  createTimeLog,
  getLogsByUserId
}
