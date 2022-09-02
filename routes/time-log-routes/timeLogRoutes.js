const express = require('express')
const router = express.Router()
const middlewares = require('../../middlewares')
const controllers = require('../../controllers')

router.get(
  '/:userId',
  middlewares.validations.timeLogValidations.getUserTimeLogsValidation,
  controllers.timeLogController.getUserTimeLogs
)

module.exports = router
