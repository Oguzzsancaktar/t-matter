const mongoose = require('mongoose')
const DAYS = require('../constants/days')
const Schema = mongoose.Schema

const defaultWorkingDay = {
  isChecked: {
    type: Boolean,
    default: false,
    required: true
  },
  startTime: {
    type: String,
    default: '09:00 am'
  },
  endTime: {
    type: String,
    default: '05:00 pm'
  },
  offTrackingTime: {
    type: String,
    default: '00:00'
  }
}

const WorkingScheduleSchema = new Schema({
  [DAYS.MONDAY]: defaultWorkingDay,
  [DAYS.TUESDAY]: defaultWorkingDay,
  [DAYS.WEDNESDAY]: defaultWorkingDay,
  [DAYS.THURSDAY]: defaultWorkingDay,
  [DAYS.FRIDAY]: defaultWorkingDay,
  [DAYS.SATURDAY]: { ...defaultWorkingDay, isWorkingDay: false },
  [DAYS.SUNDAY]: { ...defaultWorkingDay, isWorkingDay: false },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
})

module.exports = WorkingSchedule = mongoose.model('workingSchedule', WorkingScheduleSchema)
