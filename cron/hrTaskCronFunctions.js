const User = require('../models/user')
const dataAccess = require('../data-access')
const moment = require('moment')
const { clockToSeconds } = require('../utils/date-utils/dateUtils')
const { HR_TASK_TYPES } = require('../constants/hrConstants')
const { calculateUserScheduleTotalTimesByRange } = require('../helpers/calculateUserScheduleTotalTimesByRange')

const mentalSender = async ({ date, user }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const timeLogs = await dataAccess.timeLogDataAccess.getLogsByUserId({
        userId: user._id.toString(),
        startDate: moment(date).startOf('month'),
        endDate: moment(date).endOf('month'),
        condition: 'ALL',
        timeOffSet: 0
      })
      const totalWorkingSeconds = timeLogs.reduce((acc, curr) => {
        return acc + curr.totalTime
      }, 0)
      const monthlyWorkingScheduleSeconds = await calculateUserScheduleTotalTimesByRange({
        userId: user._id.toString(),
        startDate: moment(date).startOf('month'),
        endDate: moment(date).endOf('month')
      })
      const hrTask = await dataAccess.hrTaskDataAccess.hrTaskFindOne({
        owner: user._id.toString(),
        type: HR_TASK_TYPES.MENTAL,
        month: moment(date).month()
      })
      if (!hrTask && totalWorkingSeconds >= monthlyWorkingScheduleSeconds?.loginTotalTime) {
        await dataAccess.hrTaskDataAccess.hrTaskCreate({
          type: HR_TASK_TYPES.MENTAL,
          description: '',
          days: 1,
          startDate: moment(date).startOf('day').add(1, 'day'),
          endDate: moment(date).endOf('day').add(1, 'day'),
          owner: user._id.toString(),
          month: moment(date).month()
        })
      }
    } catch (error) {
      console.log('MENTAL SENDER ERROR', error)
      reject(error)
    }
  })
}

const absentSender = async ({ workingSchedule, date, user }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const workingScheduleDay = workingSchedule[moment(date).format('dddd')]
      const workingDayEnd = moment(moment(date).startOf('day').format('MM DD YYYY HH:mm:ss'))
        .add(clockToSeconds(workingScheduleDay.endTime), 'seconds')
        .format('MM DD YYYY HH:mm:ss')
      const isWorkingEndPassed = moment(date).isAfter(workingDayEnd)
      if (workingScheduleDay.isChecked && isWorkingEndPassed) {
        const lastLogin = await dataAccess.timeLogDataAccess.findLastLog(user._id.toString())
        const isLastLoginToday = moment(lastLogin?.createdAt).isSame(moment(date), 'day')
        if (lastLogin && isLastLoginToday) {
          resolve()
        }
        const hrTask = await dataAccess.hrTaskDataAccess.hrTaskFindOne({
          owner: user._id.toString(),
          type: HR_TASK_TYPES.ABSENT,
          startDate: moment(date).startOf('day'),
          endDate: moment(date).endOf('day')
        })
        if (!hrTask) {
          await dataAccess.hrTaskDataAccess.hrTaskCreate({
            type: HR_TASK_TYPES.ABSENT,
            description: '',
            days: 1,
            startDate: moment(date).startOf('day'),
            endDate: moment(date).endOf('day'),
            owner: user._id.toString()
          })
          const mentalTask = await dataAccess.hrTaskDataAccess.hrTaskFindOne({
            owner: user._id.toString(),
            type: HR_TASK_TYPES.MENTAL,
            isCompleted: false
          })
          if (mentalTask) {
            await dataAccess.hrTaskDataAccess.hrTaskFindByIdAndUpdate(mentalTask._id.toString(), {
              isCompleted: true,
              startDate: moment(date).startOf('day'),
              endDate: moment(date).endOf('day')
            })
          }
        }
      }
    } catch (error) {
      console.log('ABSENT SENDER ERROR', error)
      reject(error)
    }
  })
}

const hrTaskSender = async date => {
  console.log('HR TASK CREATOR CRON JOB', date)
  const users = await User.find({})
  for (const user of users) {
    let hrSetting = await dataAccess.hrSettingDataAccess.getHrSettingByUserId({ userId: user._id.toString() }).lean()
    const { workingSchedule } = await dataAccess.workingScheduleDataAccess.findWorkingScheduleByUserIdOrDefault(
      user._id.toString()
    )
    if (!hrSetting) {
      hrSetting = await dataAccess.hrSettingDataAccess.getHrSettingByUserId({ userId: null }).lean()
    }
    // MENTAL
    if (hrSetting.monthlyWorking.isChecked) {
      try {
        await mentalSender({ date, user })
      } catch (error) {}
    }
    // ABSENT
    if (hrSetting.loginLogout.isChecked) {
      try {
        await absentSender({ workingSchedule, date, user })
      } catch (error) {}
    }
    //VOCATION
    if (hrSetting.vocations.length > 0) {
      for (const voc of hrSetting.vocations) {
        if (voc.isChecked) {
          /*
           * TODO:
           *  - if user workingHours passed ${voc.afterHours} then create
           *  - Create ${HR_TASK_TYPES.VACATION} with ${voc.days} task for the user
           *  - and notify ${voc.notificationReceivers}
           */
        }
      }
    }

    if (hrSetting.specialDays.length > 0) {
      for (const specialDay of hrSetting.specialDays) {
        if (specialDay.isChecked) {
          if (moment(specialDay.startDate).isBefore(moment())) {
            // const hrT = await dataAccess.hrTaskDataAccess.hrTaskFindOne({
            //   startDate: specialDay.startDate,
            //   endDate: specialDay.endDate,
            //   type: HR_TASK_TYPES.OTHERS,
            //   owner: user._id.toString()
            // })
            // if (!hrT) {
            //   await dataAccess.hrTaskDataAccess.hrTaskCreate({
            //     type: HR_TASK_TYPES.OTHERS,
            //     description: '',
            //     days: Math.abs(moment(specialDay.endDate).diff(moment(specialDay.startDate), 'days')),
            //     startDate: specialDay.startDate,
            //     endDate: specialDay.endDate,
            //     owner: user._id.toString()
            //   })
            // }
          }
        }
      }
    }
  }
}

module.exports = {
  hrTaskSender
}
