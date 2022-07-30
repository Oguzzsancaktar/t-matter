const joi = require('joi')
const utils = require('../../../utils')

const customerValidationSchema = {
  aSharpNumber: joi.string(),
  country: joi.string(),
  city: joi.string(),
  state: joi.string(),
  address: joi.string(),
  zipcode: joi.string(),
  birthday: joi.date(),
  birthplace: joi.string(),

  customerType: joi.number(),
  firstname: joi.string().required(),
  lastname: joi.string().required(),
  email: joi.string().required(),
  phone: joi.string().required(),
  refferedBy: joi.object().required(),
  gender: joi.number().required(),
  reliableInCompany: joi.array(),
  createContact: joi.array()
}

const createCustomerValidation = async (req, res, next) => {
  const { body } = req
  const schema = joi.object({ ...customerValidationSchema })

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
