const express = require('express')
const router = express.Router()
const middlewares = require('../../middlewares')
const controllers = require('../../controllers')

router.post(
  '/category',
  middlewares.validations.workflowValidations.createWorkflowCategoryValidation,
  controllers.workflowController.createWorkflowCategory
)

router.get('/category', controllers.workflowController.getWorkflowCategories)
router.get('/category/:id', controllers.workflowController.getWorkflowCategoryById)

router.patch(
  '/category/:id',
  middlewares.validations.workflowValidations.updateWorkflowCategoryValidation,
  controllers.workflowController.updateCategory
)

router.patch(
  '/category/:id/status',
  middlewares.validations.generalValidations.statusUpdateValidation,
  controllers.workflowController.updateCategory
)

// Chekclist
router.post(
  '/checklist',
  middlewares.validations.workflowValidations.createWorkflowChecklistValidation,
  controllers.workflowController.createWorkflowChecklist
)

router.get('/checklist', controllers.workflowController.getWorkflowChecklists)

module.exports = router
