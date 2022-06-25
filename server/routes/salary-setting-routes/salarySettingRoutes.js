const express = require('express')
const router = express.Router()
const middlewares = require('../../middlewares')
const controllers = require('../../controllers')

router.post(
  '/',
  middlewares.validations.salarySettingValidations.createSalarySettingValidation,
  controllers.salarySettingController.createSalarySetting
)

router.post(
  '/:userId',
  middlewares.validations.salarySettingValidations.createSalarySettingValidation,
  controllers.salarySettingController.createSalarySetting
)

router.patch(
  '/',
  middlewares.validations.salarySettingValidations.updateSalarySettingValidation,
  controllers.salarySettingController.updateSalarySetting
)

router.get('/', controllers.salarySettingController.getSalarySetting)

router.get(
  '/:userId',
  middlewares.validations.salarySettingValidations.getUserSalarySettingValidation,
  controllers.salarySettingController.getSalarySetting
)

module.exports = router
