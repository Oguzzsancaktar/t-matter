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

const websiteStyleValidationSchema = {
  navbarBorderColor: Joi.string().required(),
  websitePaddingColor: Joi.string().required(),
  websiteBackgroundColor: Joi.string().required(),
  websiteModalButtonsBackgroundColor: Joi.string().required(),
  websiteModalButtonsBorderColor: Joi.string().required(),
  websitePaddingVertical: Joi.number().required(),
  websitePaddingHorizontal: Joi.number().required(),
  websiteBorderRadius: Joi.number().required(),
  websiteImageBorderRadius: Joi.number().required(),
  websiteModalButtonsBorderRadius: Joi.number().required(),
  websiteModalButtonsBorderWidth: Joi.number().required(),
  navlinkTextColor: Joi.string().required(),
  navlinkHoverTextColor: Joi.string().required(),
  informationHeaderTextColor: Joi.string().required(),
  informationDescriptionTextColor: Joi.string().required(),
  informationButtonTextColor: Joi.string().required(),
  contactIconColor: Joi.string().required(),
  contactTitleColor: Joi.string().required(),
  contactContentColor: Joi.string().required(),

  websiteModalIconColor: Joi.string().required(),
  websiteModalTitleColor: Joi.string().required(),
  websiteModalContentColor: Joi.string().required()
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

const createOrUpdateWebsiteStyleSettingsValidation = async (req, res, next) => {
  const { body } = req
  const schema = Joi.object({ ...websiteStyleValidationSchema, _id: Joi.string() })

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
  createOrUpdateWebsiteTextSettingsValidation,
  createOrUpdateWebsiteStyleSettingsValidation
}
