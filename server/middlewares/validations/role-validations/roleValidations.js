const joi = require('joi')
const utils = require('../../../utils')

const createRoleValidation = async (req, res, next) => {
  const { body } = req
  const schema = joi.object({
    name: joi.string().required()
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

const updateRoleValidation = async (req, res, next) => {
  const { body } = req
  const schema = joi.object({
    name: joi.string().required(),
    id: joi.string().required()
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

const getRoleValidation = async (req, res, next) => {
  const { params } = req
  const schema = joi.object({
    id: joi.string().required()
  })

  try {
    await schema.validateAsync(params)
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
  createRoleValidation,
  updateRoleValidation,
  getRoleValidation
}
