const mongoose = require('mongoose')
const DAYS = require('../constants/days')
const Schema = mongoose.Schema

const defaultWorkingDay = {
  isWorkingDay: {
    type: Boolean,
    default: false,
    required: true
  },
  startTime: {
    type: Number,
    default: 9
  },
  endTime: {
    type: Number,
    default: 17
  },
  offTrackingTime: {
    type: Number,
    default: 0
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
    ref: 'user'
  }
})

module.exports = WorkingSchedule = mongoose.model('workingSchedule', WorkingScheduleSchema)
