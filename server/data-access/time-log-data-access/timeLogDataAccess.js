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

    // if logouts are not empty and last logout is after last login
    const isLogoutAfterLogin =
      logouts.length > 0 && logouts[logouts.length - 1].createdAt > logins[logins.length - 1].createdAt
    if (!isLogoutAfterLogin) {
      return { date: _id, totalTime: 0, login: logins[0].createdAt, logout: null }
    }

    const totalTime = logins.reduce((acc, curr, i) => {
      return acc + moment(moment(logouts[i]?.createdAt)).diff(curr.createdAt, 'seconds')
    }, 0)

    return {
      date: _id,
      totalTime,
      login: logins[0].createdAt,
      logout: logouts[logouts.length - 1].createdAt
    }
  }, [])
}

module.exports = {
  createTimeLog,
  getLogsByUserId
}
