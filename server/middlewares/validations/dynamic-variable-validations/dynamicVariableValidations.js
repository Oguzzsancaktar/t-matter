const joi = require('joi')
const utils = require('../../../utils')

const locationValidationSchema = {
  name: joi.string().required()
}

const createLocationValidation = async (req, res, next) => {
  const { body } = req
  const schema = joi.object({ ...locationValidationSchema })

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

const updateLocationValidation = async (req, res, next) => {
  const { id } = req.params
  const { body } = req
  const schema = joi.object({ ...locationValidationSchema, id: joi.string().required() })

  try {
    await schema.validateAsync({ ...body, id })
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
  createLocationValidation,
  updateLocationValidation
}
