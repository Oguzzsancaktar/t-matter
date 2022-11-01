const joi = require('joi')
const utils = require('../../../utils')

const customerValidationSchema = {
  aSharpNumber: joi.string().allow(''),
  country: joi.string().allow(''),
  city: joi.string().allow(''),
  state: joi.string().allow(''),
  address: joi.string().allow(''),
  zipcode: joi.string().allow(''),
  birthday: joi.date().allow(''),
  birthplace: joi.string().allow(''),

  cloudinary_id: joi.any(),
  profile_img: joi.any(),
  customerType: joi.string(),
  firstname: joi.string().required(),
  lastname: joi.string().required(),
  email: joi.string().required(),
  phone: joi.string().required(),
  jobTitle: joi.string(),
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

  const schema = joi.object({
    ...customerValidationSchema,
    _id: joi.string().required(),
    reliableCustomers: joi.array(),
    deleteReliableId: joi.array()
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
  const { customerType } = req.body
  const schema = joi.object({ id: joi.string().required(), customerType: joi.string().required() })

  try {
    await schema.validateAsync({ id, customerType })
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
