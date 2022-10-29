const joi = require('joi')
const utils = require('../../../utils')

const customerWorkActivityValidationSchema = {
  customer: joi.string().required(),
  creator: joi.string().required(),
  type: joi.number().required()
}

const createCustomerWorkActivityValidation = async (req, res, next) => {
  const { body } = req

  const schema = joi.object(customerWorkActivityValidationSchema)

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
  createCustomerWorkActivityValidation
}
