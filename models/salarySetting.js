const mongoose = require('mongoose')
const { Schema } = mongoose

const SalarySettingSchema = new Schema({
  defaultPayrollRate: {
    required: true,
    type: Number
  },
  payrollIncreases: [
    {
      increaseHour: Number,
      increaseRate: Number // %20
    }
  ],
  notificationTask: {
    type: mongoose.Types.ObjectId,
    ref: 'Task'
  },
  notificationType: {
    type: Number
  },
  notificationReceiver: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  isNotificationForAdmin: {
    type: Boolean
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = SalarySetting = mongoose.model('SalarySetting', SalarySettingSchema)
