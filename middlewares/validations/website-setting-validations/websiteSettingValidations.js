const Joi = require('joi')
const utils = require('../../../utils')

const websiteTextValidationSchema = {
  informationHeader: Joi.string().required(),
  informationDescription: Joi.string().required(),
  informationButtonText: Joi.string().required(),
  navlinks: Joi.array().required(),
  contactInformations: Joi.array().required(),
  modalSections: Joi.array().required()
}

const createOrUpdateWebsiteTextSettingsValidation = async (req, res, next) => {
  const { body } = req
  const schema = Joi.object({ ...websiteTextValidationSchema, _id: Joi.string() })

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
  createOrUpdateWebsiteTextSettingsValidation
}
