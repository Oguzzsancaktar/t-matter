const joi = require('joi')
const validateAsync = require('../validateAsync')
const { workingScheduleSchema } = require('./workingScheduleValidationConstants')
const PAYROLL = require('../../../constants/payroll')

const customPayrollDayValidation = (value, helpers, body) => {
  if (body.payrollType === PAYROLL.MONTHLY) {
    if (value < 1 || value > 31) {
      return helpers.error('Your payroll type is monthly, so the payroll day must be between 1 and 31')
    }
  }
  if (body.payrollType === PAYROLL.WEEKLY) {
    if (value < 1 || value > 7) {
      return helpers.error('Your payroll type is weekly, so the payroll day must be between 1 and 7')
    }
  }
}

const getUserWorkingScheduleValidation = async (req, res, next) => {
  const { userId } = req.params
  const schema = joi.object().keys({
    userId: joi.string().required()
  })

  await validateAsync({ schema, data: { userId } }, req, res, next)
}

const patchUserWorkingScheduleValidation = async (req, res, next) => {
  const { userId } = req.params
  const { body } = req

  const schema = joi.object().keys({
    userId: joi.string().required(),
    workingSchedule: workingScheduleSchema,
    payrollType: joi.number().min(PAYROLL.MONTHLY).max(PAYROLL.WEEKLY).required(),
    payrollDay: joi.number().custom((value, helpers) => customPayrollDayValidation(value, helpers, body))
  })

  await validateAsync({ schema, data: { userId, ...body } }, req, res, next)
}

module.exports = { getUserWorkingScheduleValidation, patchUserWorkingScheduleValidation }
