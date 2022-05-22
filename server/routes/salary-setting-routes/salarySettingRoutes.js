const express = require('express')
const router = express.Router()
const middlewares = require('../../middlewares')
const controllers = require('../../controllers')

router.post(
  '/',
  middlewares.validations.salarySettingValidations.createSalarySettingValidation,
  controllers.salarySettingController.createSalarySetting
)

router.patch(
  '/',
  middlewares.validations.salarySettingValidations.updateSalarySettingValidation,
  controllers.salarySettingController.updateSalarySetting
)

router.get('/', controllers.salarySettingController.getSalarySetting)

module.exports = router
