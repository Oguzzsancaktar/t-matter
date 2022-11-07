const TimeLog = require('../../models/timeLog')
const mongoose = require('mongoose')
const { LOG_TYPES } = require('../../constants/log')
const moment = require('moment')

const createTimeLog = data => {
  return TimeLog.create(data)
}

const getLogsByUserId = async (userId, timeOffSet) => {
  console.log('timeOffSet', timeOffSet)
  const timeLogs = await TimeLog.aggregate([
    { $match: { owner: mongoose.Types.ObjectId(userId) } },
    {
      $addFields: {
        date: {
          $dateAdd: {
            startDate: '$createdAt',
            unit: 'minute',
            amount: -timeOffSet
          }
        }
      }
    },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
        logs: {
          $push: '$$ROOT'
        }
      }
    },
    {
      $sort: {
        _id: -1
      }
    }
  ]).exec()

  return timeLogs.reduce((acc, curr) => {
    const { _id, logs } = curr
    const logouts = logs.filter(log => log.logType === LOG_TYPES.LOGOUT).sort((a, b) => a.date - b.date)
    const logins = logs.filter(log => log.logType === LOG_TYPES.LOGIN).sort((a, b) => a.date - b.date)

    const totalTime = logins.reduce((acc, curr, i) => {
      if (logouts[i]) {
        return acc + moment(moment(logouts[i].date)).diff(curr.date, 'seconds')
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

const findLastLog = async userId => {
  return TimeLog.findOne({ owner: userId }).sort({ createdAt: -1 }).exec()
}

const removeTimeLog = async id => {
  return TimeLog.findByIdAndDelete(id).exec()
}

module.exports = {
  createTimeLog,
  getLogsByUserId,
  findLastLog,
  removeTimeLog
}
