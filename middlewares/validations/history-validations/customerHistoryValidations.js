const joi = require('joi')
const utils = require('../../../utils')

const customerHistoryValidationSchema = {
  customer: joi.string().required(),
  responsible: joi.string().required(),
  type: joi.number().required()
}

const createCustomerHistoryValidation = async (req, res, next) => {
  const { body } = req

  const schema = joi.object(customerHistoryValidationSchema)

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
  createCustomerHistoryValidation
}
