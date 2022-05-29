const joi = require('joi')
const utils = require('../../../utils')

const createUserValidation = async (req, res, next) => {
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

const updateUserValidation = async (req, res, next) => {
  const { body } = req
  const schema = joi.object({
    _id: joi.string().required(),
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
  createUserValidation,
  updateUserValidation
}
