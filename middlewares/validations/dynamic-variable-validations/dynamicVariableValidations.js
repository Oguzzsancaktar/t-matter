const joi = require('joi')
const utils = require('../../../utils')

// RelativeType
const relativeTypeValidationSchema = {
  relateTo: joi.string().required(),
  relateFrom: joi.string().required()
}

const createRelativeTypeValidation = async (req, res, next) => {
  const { body } = req
  const schema = joi.object({ ...relativeTypeValidationSchema })

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

const updateRelativeTypeValidation = async (req, res, next) => {
  const { id } = req.params
  const { body } = req
  const schema = joi.object({ ...relativeTypeValidationSchema, id: joi.string().required() })

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

// RefferedBy
const refferedByValidationSchema = {
  name: joi.string().required(),
  color: joi.string().required()
}

const createRefferedByValidation = async (req, res, next) => {
  const { body } = req
  const schema = joi.object({ ...refferedByValidationSchema })

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

const updateRefferedByValidation = async (req, res, next) => {
  const { id } = req.params
  const { body } = req
  const schema = joi.object({ ...refferedByValidationSchema, id: joi.string().required() })

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

// Location
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

// Job Title
const jobTitleValidationSchema = {
  name: joi.string().required()
}

const createJobTitleValidation = async (req, res, next) => {
  const { body } = req
  const schema = joi.object({ ...jobTitleValidationSchema })

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

const updateJobTitleValidation = async (req, res, next) => {
  const { id } = req.params
  const { body } = req
  const schema = joi.object({ ...jobTitleValidationSchema, id: joi.string().required() })

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
  updateLocationValidation,

  createRefferedByValidation,
  updateRefferedByValidation,

  createRelativeTypeValidation,
  updateRelativeTypeValidation,

  createJobTitleValidation,
  updateJobTitleValidation
}
