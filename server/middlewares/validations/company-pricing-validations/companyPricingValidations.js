const joi = require('joi')
const utils = require('../../../utils')
const PAYROLL = require('../../../constants/payroll')
const { workingScheduleValidationConstants } = require('../working-schedule-validations/index')

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

const createCompanyPricing = async (req, res, next) => {
  const { body } = req
  const schema = joi.object().keys({
    dailyAverageExpenseAmount: joi.number().required(),
    specifiedCompanyProfit: joi.number().required(),
    payrollType: joi.number().min(PAYROLL.MONTHLY).max(PAYROLL.WEEKLY).required(),
    payrollDay: joi.number().custom((value, helpers) => customPayrollDayValidation(value, helpers, body)),
    workingSchedule: workingScheduleValidationConstants.workingScheduleSchema
  })

  try {
    await schema.validateAsync(body)
    next()
  } catch (error) {
    res.status(400).json(utils.errorUtils.errorInstance({ message: error.message, validationError: error.details }))
  }
}

const updateCompanyPricing = async (req, res, next) => {
  const { body } = req
  const schema = joi.object().keys({
    dailyAverageExpenseAmount: joi.number().required(),
    specifiedCompanyProfit: joi.number().required(),
    payrollType: joi.number().min(PAYROLL.MONTHLY).max(PAYROLL.WEEKLY).required(),
    payrollDay: joi.number().custom((value, helpers) => customPayrollDayValidation(value, helpers, body)),
    workingSchedule: workingScheduleValidationConstants.workingScheduleSchema
  })

  try {
    await schema.validateAsync(body)
    next()
  } catch (error) {
    res.status(400).json(utils.errorUtils.errorInstance({ message: error.message, validationError: error.details }))
  }
}

module.exports = {
  createCompanyPricing,
  updateCompanyPricing
}
