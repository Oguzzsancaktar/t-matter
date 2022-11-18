const express = require('express')
const router = express.Router()
const middlewares = require('../../middlewares')
const controllers = require('../../controllers')

// Texts
router.post(
  '/text',
  middlewares.validations.websiteSettingValidations.createOrUpdateWebsiteTextSettingsValidation,
  controllers.websiteSettingsController.createOrUpdateWebsiteTextSettings
)

router.get('/text', controllers.websiteSettingsController.getWebsiteTextSettings)

// router.get('/category', controllers.workflowController.getWorkflowCategories)
// router.get('/category/:id', controllers.workflowController.getWorkflowCategoryById)

// router.patch(
//   '/category/:id',
//   middlewares.validations.workflowValidations.updateWorkflowCategoryValidation,
//   controllers.workflowController.updateCategory
// )

// router.patch(
//   '/category/:id/status',
//   middlewares.validations.generalValidations.statusUpdateValidation,
//   controllers.workflowController.updateCategory
// )

module.exports = router
