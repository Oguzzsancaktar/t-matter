const express = require('express')
const router = express.Router()
const middlewares = require('../../middlewares')
const controllers = require('../../controllers')

router.get(
  '/:userId',
  middlewares.validations.workingScheduleValidations.workingScheduleValidations.getUserWorkingScheduleValidation,
  controllers.workingScheduleController.getUserWorkingSchedule
)

router.patch(
  '/:userId',
  middlewares.validations.workingScheduleValidations.workingScheduleValidations.patchUserWorkingScheduleValidation,
  controllers.workingScheduleController.patchUserWorkingSchedule
)

module.exports = router
