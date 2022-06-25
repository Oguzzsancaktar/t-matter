const joi = require('joi')
const utils = require('../../../utils')

const salarySettingValidations = {
  defaultPayrollRate: joi.number().required(),
  payrollIncreases: joi.array().items(
    joi.object({
      increaseHour: joi.number().required(),
      increaseRate: joi.number().required()
    })
  )
}

const createSalarySettingValidation = async (req, res, next) => {
  const { body } = req
  const schema = joi.object(salarySettingValidations)

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

const patchUserSalarySettingValidation = async (req, res, next) => {
  const { userId } = req.params
  const { body } = req

  const schema = joi.object({
    userId: joi.string().required(),
    ...salarySettingValidations
  })

  try {
    await schema.validateAsync({ userId, ...body })
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
    _id: joi.string().required(),
    defaultPayrollRate: joi.number().required(),
    payrollIncreases: joi.array().items(
      joi.object({
        _id: joi.string(),
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

const getUserSalarySettingValidation = async (req, res, next) => {
  const { userId } = req.params
  const schema = joi.object({
    userId: joi.string().required()
  })

  try {
    await schema.validateAsync({ userId })
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
  updateSalarySettingValidation,
  getUserSalarySettingValidation,
  patchUserSalarySettingValidation
}
