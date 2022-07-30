const joi = require('joi')
const validateAsync = require('../validateAsync')
const {userValidationSchema} = require("../user-validations/userValidations");

const categorySchema = joi.object({
  name: joi.string().required(),
  updatedAt: joi.date().required(),
  _id: joi.string(),
  status: joi.number()
})

const locationSchema = joi.object({
  name: joi.string().required(),
  status: joi.number(),
  _id: joi.string(),
})

const responsibleUserSchema = joi.object(userValidationSchema)

const checklistItemSchema = joi.object({
  createdAt: joi.date(),
  duration: joi.number().required(),
  name: joi.string().required(),
  status: joi.number(),
  _id: joi.string(),
  points: joi.number().required(),
  updatedAt: joi.date(),
})

const createTaskValidation = async (req, res, next) => {
  const schema = joi.object({
    customerId: joi.string().required(),
    name: joi.string().required(),
    createdAt: joi.date(),
    status: joi.number(),
    steps: joi.array().items(joi.object({
      category: categorySchema,
      location: locationSchema,
      responsibleUser: responsibleUserSchema,
      checklistItems: joi.array().items(checklistItemSchema),
      expireDuration: joi.number().required(),
      postponeTime: joi.number().required(),
      stepColor: joi.string().required(),
      tabs: joi.array().items(joi.string()),
      _id: joi.string(),
    })),
    updatedAt: joi.string(),
    _id: joi.string(),
  })

  await validateAsync({ schema, data: {...req.body, customerId: req.params.customerId} }, req, res, next)
}

const getTasksValidation = async (req, res, next) => {
  const schema = joi.object({
    customerId: joi.string().required(),
  })

  await validateAsync({ schema, data: {customerId: req.params.customerId} }, req, res, next)
}

module.exports = {
  createTaskValidation,
  getTasksValidation
}
