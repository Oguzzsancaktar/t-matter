const joi = require('joi')
const utils = require('../../../utils')

const createUserValidation = async (req, res, next) => {
  const { body } = req
  const schema = joi.object({})

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
  const schema = joi.object({})

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

const getUserValidation = async (req, res, next) => {
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

const removeUserValidation = async (req, res, next) => {
  const { body } = req
  const schema = joi.object({})

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
  updateUserValidation,
  getUserValidation,
  removeUserValidation
}
