const joi = require('joi')
const utils = require('../../../utils')

const customerValidationSchema = {
  address: joi.string().required(),
  birthday: joi.date().required(),
  birthplace: joi.string().required(),
  city: joi.string().required(),
  country: joi.string().required(),
  email: joi.string().required(),
  firstname: joi.string().required(),
  lastname: joi.string().required(),
  gender: joi.number().required(),
  phone: joi.string().required(),
  role: joi.string().required(),
  state: joi.string().required(),
  status: joi.number().required(),
  zipcode: joi.string().required()
  // password: joi.string().required(), --- password is not required for update
}

const createCustomerValidation = async (req, res, next) => {
  const { body } = req
  const schema = joi.object({ ...customerValidationSchema, password: joi.string().required() })

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

const updateCustomerValidation = async (req, res, next) => {
  const { body } = req
  const schema = joi.object({ ...customerValidationSchema, _id: joi.string().required() })

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

const getCustomerValidation = async (req, res, next) => {
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

const statusUpdateCustomerValidation = async (req, res, next) => {
  const { id } = req.params
  const { status } = req.body
  const schema = joi.object({ id: joi.string().required(), status: joi.number().required() })

  try {
    await schema.validateAsync({ id, status })
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
  createCustomerValidation,
  updateCustomerValidation,
  getCustomerValidation,
  statusUpdateCustomerValidation
}
