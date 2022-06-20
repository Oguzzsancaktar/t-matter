const joi = require('joi')
const utils = require('../../../utils')

const workflowCategoryValidationSchema = {
  name: joi.string().required()
}

const workflowChecklistValidationSchema = {
  name: joi.string().required(),
  point: joi.number().required(),
  duration: joi.number().required(),
  price: joi.number().required()
}

const createWorkflowCategoryValidation = async (req, res, next) => {
  const { body } = req
  const schema = joi.object({ ...workflowCategoryValidationSchema })

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

const updateWorkflowCategoryValidation = async (req, res, next) => {
  const { id } = req.params
  const { body } = req
  const schema = joi.object({ ...workflowCategoryValidationSchema, id: joi.string().required() })

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

const createWorkflowChecklistValidation = async (req, res, next) => {
  const { body } = req
  const schema = joi.object({ ...workflowChecklistValidationSchema })

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

const updateWorkflowChecklistValidation = async (req, res, next) => {
  const { id } = req.params
  const { body } = req
  const schema = joi.object({ ...workflowChecklistValidationSchema, id: joi.string().required() })

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
  createWorkflowCategoryValidation,
  updateWorkflowCategoryValidation,

  createWorkflowChecklistValidation,
  updateWorkflowChecklistValidation
}
