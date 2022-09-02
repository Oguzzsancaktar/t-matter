const joi = require('joi')
const validateAsync = require('../validateAsync')

const getUserTimeLogsValidation = async (req, res, next) => {
  const { userId } = req.params

  const schema = joi.object({
    userId: joi.string().required()
  })
  await validateAsync({ schema, data: { userId } }, req, res, next)
}

module.exports = {
  getUserTimeLogsValidation
}
