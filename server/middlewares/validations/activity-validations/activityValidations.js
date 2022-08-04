const joi = require('joi')
const validateAsync = require('../validateAsync')

const activityCreateValidation = async (req, res, next) => {
  const activityCreateSchema = joi.object({
    owner: joi.string().required(),
    customer: joi.string(),
    task: joi.string(),
    type: joi.number().required(),
    title: joi.string().required(),
    content: joi.string(),
    links: joi.array().items(joi.object({ url: joi.string().required(), text: joi.string().required() }))
  })

  await validateAsync({ schema: activityCreateSchema, data: req.body }, req, res, next)
}

module.exports = {
  activityCreateValidation
}
