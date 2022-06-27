const joi = require('joi')
const validateAsync = require('../validateAsync')
const { workingScheduleSchema } = require('./workingScheduleValidationConstants')

const getUserWorkingScheduleValidation = async (req, res, next) => {
  const { userId } = req.params
  const schema = joi.object().keys({
    userId: joi.string().required()
  })

  await validateAsync({ schema, data: { userId } }, req, res, next)
}

const patchUserWorkingScheduleValidation = async (req, res, next) => {
  const { userId } = req.params
  const { body } = req

  const schema = joi.object().keys({
    userId: joi.string().required(),
    workingSchedule: workingScheduleSchema
  })

  await validateAsync({ schema, data: { userId, workingSchedule: body } }, req, res, next)
}

module.exports = { getUserWorkingScheduleValidation, patchUserWorkingScheduleValidation }
