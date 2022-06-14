const joi = require('joi')
const utils = require('../../../utils')

const workflowCategoryValidationSchema = {
  name: joi.string().required()
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

module.exports = {
  createWorkflowCategoryValidation
}
