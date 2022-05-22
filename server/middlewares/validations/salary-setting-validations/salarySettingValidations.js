const joi = require('joi')
const utils = require('../../../utils')

const createSalarySettingValidation = async (req, res, next) => {
  const { body } = req
  const schema = joi.object({
    defaultPayrollRate: joi.number().required(),
    payrollIncreases: joi.array().items(
      joi.object({
        increaseHour: joi.number().required(),
        increaseRate: joi.number().required()
      })
    )
  })

  try {
    await schema.validateAsync(body)
    next()
  } catch (error) {
    res.status(400).json(
      utils.errorUtils.errorInstance({
        message: error.message,
        validationError: error.details
      })
    )
  }
}

const updateSalarySettingValidation = async (req, res, next) => {
  const { body } = req
  const schema = joi.object({
    defaultPayrollRate: joi.number().required(),
    payrollIncreases: joi.array().items(
      joi.object({
        increaseHour: joi.number().required(),
        increaseRate: joi.number().required()
      })
    )
  })

  try {
    await schema.validateAsync(body)
    next()
  } catch (error) {
    res.status(400).json(
      utils.errorUtils.errorInstance({
        message: error.message,
        validationError: error.details
      })
    )
  }
}

module.exports = {
  createSalarySettingValidation,
  updateSalarySettingValidation
}
