const { calculateUserWeeklyWorkingSeconds } = require('./calculateUserWeeklyWorkingHours')

const getDaysArray = function (start, end) {
  for (var arr = [], dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
    arr.push(new Date(dt))
  }
  return arr
}

const calculateUserScheduleTotalTimesByRange = ({ userId, startDate, endDate }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const daysForTracking = await calculateUserWeeklyWorkingSeconds(userId)
      const daysForLogin = await calculateUserWeeklyWorkingSeconds(userId, false)

      const dates = getDaysArray(startDate, endDate)

      const { loginTotalTime, trackingTotalTime } = dates.reduce(
        (acc, curr) => {
          const day = curr.getDay()
          const l = daysForLogin[day]
          const t = daysForTracking[day]
          acc.loginTotalTime += l
          acc.trackingTotalTime += t
          return acc
        },
        { loginTotalTime: 0, trackingTotalTime: 0 }
      )

      resolve({
        loginTotalTime,
        trackingTotalTime
      })
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  calculateUserScheduleTotalTimesByRange
}
