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
    ref: 'task'
  },
  notificationType: {
    type: Number
  },
  notificationReceiver: {
    type: mongoose.Types.ObjectId,
    ref: 'user'
  },
  isNotificationForAdmin: {
    type: Boolean
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'user'
  }
})

module.exports = SalarySetting = mongoose.model('SalarySetting', SalarySettingSchema)
