const joi = require('joi')
const validateAsync = require('../validateAsync')

const categorySchema = joi
  .object({
    _id: joi.string()
  })
  .options({ allowUnknown: true })

const locationSchema = joi
  .object({
    _id: joi.string().required()
  })
  .options({ allowUnknown: true })

const responsibleUserSchema = joi
  .object({
    _id: joi.string().required()
  })
  .options({ allowUnknown: true })

const checklistItemSchema = joi
  .object({
    createdAt: joi.date(),
    duration: joi.number().required(),
    name: joi.string().required(),
    status: joi.number(),
    _id: joi.string(),
    point: joi.number().required(),
    updatedAt: joi.date()
  })
  .options({ allowUnknown: true })

const createTaskValidation = async (req, res, next) => {
  const schema = joi
    .object({
      customerId: joi.string().required(),
      name: joi.string(),
      createdAt: joi.date(),
      status: joi.number(),
      steps: joi.array().items(
        joi.object({
          category: categorySchema,
          location: locationSchema,
          responsibleUser: responsibleUserSchema,
          checklistItems: joi.array().items(checklistItemSchema),
          expireDuration: joi.number().required(),
          postponeTime: joi.number().required(),
          stepColor: joi.string().required(),
          tabs: joi.array().items(joi.string()),
          _id: joi.string()
        })
      ),
      updatedAt: joi.string(),
      _id: joi.string()
    })
    .options({ allowUnknown: true })

  await validateAsync({ schema, data: { ...req.body, customerId: req.params.customerId } }, req, res, next)
}

const getTasksValidation = async (req, res, next) => {
  const schema = joi.object({
    customerId: joi.string().required()
  })

  await validateAsync({ schema, data: { customerId: req.params.customerId } }, req, res, next)
}

const getTaskValidation = async (req, res, next) => {
  const schema = joi.object({
    taskId: joi.string().required()
  })

  await validateAsync({ schema, data: { taskId: req.params.taskId } }, req, res, next)
}

module.exports = {
  createTaskValidation,
  getTasksValidation,
  getTaskValidation
}
