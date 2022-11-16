const workingScheduleDataAccess = require('../data-access/working-schedule-data-access/workingScheduleDataAccess')
const { clockToSeconds } = require('../utils/date-utils/dateUtils')

const calculateUserWeeklyWorkingSeconds = (userId, offTrack = true) => {
  return new Promise(async (resolve, reject) => {
    try {
      let w = await workingScheduleDataAccess.findWorkingScheduleByUserId(userId)
      if (!w) {
        w = await workingScheduleDataAccess.findCompanyWorkingSchedule()
      }
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      w = w.workingSchedule
      resolve(
        days.reduce((acc, curr) => {
          const day = w[curr]
          if (!day.isChecked) {
            acc.push(0)
          }
          if (day.isChecked) {
            let second = clockToSeconds(day.endTime) - clockToSeconds(day.startTime)
            if (offTrack) {
              second = second - clockToSeconds(day.offTrackingTime)
            }
            acc.push(second)
          }
          return acc
        }, [])
      )
    } catch (error) {
      reject([0, 0, 0, 0, 0, 0, 0])
    }
  })
}

module.exports = {
  calculateUserWeeklyWorkingSeconds
}
