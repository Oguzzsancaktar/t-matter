const User = require('../models/user')
const dataAccess = require('../data-access')
const moment = require('moment')
const { HR_TASK_TYPES } = require('../constants/hrConstants')

const hrTaskSender = async date => {
  console.log('HR TASK CREATOR CRON JOB', date)
  const users = await User.find({})
  for (const user of users) {
    let hrSetting = await dataAccess.hrSettingDataAccess.getHrSettingByUserId({ userId: user._id.toString() })
    if (!hrSetting) {
      hrSetting = await dataAccess.hrSettingDataAccess.getHrSettingByUserId({ userId: null })
    }
    if (hrSetting.monthlyWorking.isChecked) {
      /*
       * TODO:
       *  - if user passed monthly working hours then create
       *  - Create ${HR_TASK_TYPES.MENTAL} task for the user
       *  - and notify the ${hrSetting.monthlyWorking.notificationReceivers}
       * */
    }
    if (hrSetting.loginLogout.isChecked) {
      /*
       * TODO:
       *  - if user didn't 1 day then create
       *  - Create ${HR_TASK_TYPES.ABSENT} task for the user
       *  - and notify the ${hrSetting.loginLogout.notificationReceivers}
       */
    }
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
            const hrT = await dataAccess.hrTaskDataAccess.hrTaskFindOne({
              startDate: specialDay.startDate,
              endDate: specialDay.endDate,
              type: HR_TASK_TYPES.OTHERS,
              owner: user._id.toString()
            })
            if (!hrT) {
              await dataAccess.hrTaskDataAccess.hrTaskCreate({
                type: HR_TASK_TYPES.OTHERS,
                description: '',
                days: Math.abs(moment(specialDay.endDate).diff(moment(specialDay.startDate), 'days')),
                startDate: specialDay.startDate,
                endDate: specialDay.endDate,
                owner: user._id.toString()
              })
            }
          }
        }
      }
    }
  }
}

module.exports = {
  hrTaskSender
}
