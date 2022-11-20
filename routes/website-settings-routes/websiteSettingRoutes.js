const express = require('express')
const router = express.Router()
const middlewares = require('../../middlewares')
const controllers = require('../../controllers')
const upload = require('../../utils/upload-utils/multer')

// Texts
router.post(
  '/text',
  middlewares.validations.websiteSettingValidations.createOrUpdateWebsiteTextSettingsValidation,
  controllers.websiteSettingsController.createOrUpdateWebsiteTextSettings
)

router.get('/text', controllers.websiteSettingsController.getWebsiteTextSettings)

// styles
router.post(
  '/style',
  middlewares.validations.websiteSettingValidations.createOrUpdateWebsiteStyleSettingsValidation,
  controllers.websiteSettingsController.createOrUpdateWebsiteStyleSettings
)

router.get('/style', controllers.websiteSettingsController.getWebsiteStyleSettings)

router.post(
  '/image/:fileName',
  upload.single('file'),
  controllers.websiteSettingsController.createOrUpdateWebsiteImageSettings
)
router.get('/image', controllers.websiteSettingsController.getWebsiteImageSettings)

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
