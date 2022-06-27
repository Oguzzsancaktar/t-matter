const joi = require('joi')
const DAYS = require('../../../constants/days')

const workingDaySchema = joi.object().keys({
  startTime: joi.string(),
  endTime: joi.string(),
  offTrackingTime: joi.string(),
  isChecked: joi.boolean().required()
})

const workingScheduleSchema = joi.object().keys({
  [DAYS.MONDAY]: workingDaySchema,
  [DAYS.TUESDAY]: workingDaySchema,
  [DAYS.WEDNESDAY]: workingDaySchema,
  [DAYS.THURSDAY]: workingDaySchema,
  [DAYS.FRIDAY]: workingDaySchema,
  [DAYS.SATURDAY]: workingDaySchema,
  [DAYS.SUNDAY]: workingDaySchema
})

module.exports = {
  workingScheduleSchema,
  workingDaySchema
}
