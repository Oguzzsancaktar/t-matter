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
router.get('/checklist/:id', controllers.workflowController.getWorkflowChecklistById)

router.patch(
  '/checklist/:id',
  middlewares.validations.workflowValidations.updateWorkflowChecklistValidation,
  controllers.workflowController.updateChecklist
)

router.patch(
  '/checklist/:id/status',
  middlewares.validations.generalValidations.statusUpdateValidation,
  controllers.workflowController.updateChecklist
)

// Plan
router.post(
  '/plan',
  middlewares.validations.workflowValidations.createWorkflowPlanValidation,
  controllers.workflowController.createWorkflowPlan
)

router.get('/plan', controllers.workflowController.getWorkflowPlans)
router.get('/plan/:id', controllers.workflowController.getWorkflowPlanById)

router.patch(
  '/plan/:id',
  middlewares.validations.workflowValidations.updateWorkflowPlanValidation,
  controllers.workflowController.updatePlan
)

router.patch(
  '/plan/:id/status',
  middlewares.validations.generalValidations.statusUpdateValidation,
  controllers.workflowController.updatePlan
)

module.exports = router
