const TimeLog = require('../../models/timeLog')
const mongoose = require('mongoose')
const { LOG_TYPES } = require('../../constants/log')
const moment = require('moment')
const taskDataAccess = require('../task-data-access/taskDataAccess')
const { HR_LOGIN_CONDITIONS } = require('../../constants/hrConstants')
const { calculateUserWeeklyWorkingSeconds } = require('../../helpers/calculateUserWeeklyWorkingHours')

const createTimeLog = data => {
  return TimeLog.create(data)
}

const getLogsByUserId = async ({ userId, timeOffSet, startDate, endDate, condition }) => {
  const pipeline = [
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
  ]

  if (startDate && endDate) {
    pipeline.unshift({
      $match: {
        createdAt: {
          $gte: moment(startDate).toDate(),
          $lte: moment(endDate).toDate()
        }
      }
    })
  }

  const timeLogs = await TimeLog.aggregate(pipeline).exec()

  return timeLogs
    .reduce(async (acc, curr) => {
      const { _id, logs } = curr
      const logouts = logs.filter(log => log.logType === LOG_TYPES.LOGOUT).sort((a, b) => a.createdAt - b.createdAt)
      const logins = logs
        .filter(log => log.logType === LOG_TYPES.LOGIN)
        .filter((l, i, array) => {
          if (i === 0) return true
          if (moment(l.createdAt).diff(array[i - 1].createdAt, 'minutes') === 0) {
            return false
          }
          return true
        })
        .sort((a, b) => a.createdAt - b.createdAt)

      const totalTime = logins.reduce((acc, curr, i) => {
        if (logouts[i]) {
          return acc + Math.abs(moment(moment(logouts[i].date)).diff(curr.date, 'seconds'))
        }
        return acc
      }, 0)
      const trackingTime = await taskDataAccess.getUserTrackingTime({ userId, date: _id })
      // calculate tracking condition
      const day = moment(_id).day()
      const seconds = (await calculateUserWeeklyWorkingSeconds(userId))[day - 1]
      const p = trackingTime / seconds
      let c = HR_LOGIN_CONDITIONS.POOR_TRACKING
      if (p > 0.6) {
        c = HR_LOGIN_CONDITIONS.NORMAL_TRACKING
      }
      if (p > 0.8) {
        c = HR_LOGIN_CONDITIONS.GOOD_TRACKING
      }
      if (p > 0.9) {
        c = HR_LOGIN_CONDITIONS.EXCELLENT_TRACKING
      }
      acc.push({
        date: _id,
        totalTime,
        login: logins[0]?.createdAt || logins[logins.length - 1]?.createdAt || moment(),
        logout: logouts[logouts.length - 1]
          ? logouts[logouts.length - 1].createdAt
          : logins[logins.length - 1].createdAt,
        trackingTime,
        condition: c
      })
      return acc
    }, [])
    .filter(l => {
      if (condition === HR_LOGIN_CONDITIONS.ALL) {
        return true
      }
      return l.condition === condition
    })
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
