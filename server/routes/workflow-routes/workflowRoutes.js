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
// router.post(
//   '/',
//   middlewares.validations.workflowValidations.createUserValidation,
//   controllers.workflowController.createUser
// )

// router.patch(
//   '/',
//   middlewares.validations.workflowValidations.updateUserValidation,
//   controllers.workflowController.updateUser
// )

// router.patch(
//   '/:id/status',
//   middlewares.validations.workflowValidations.statusUpdateUserValidation,
//   controllers.workflowController.updateUser
// )

// router.get('/', controllers.workflowController.getUsers)

module.exports = router
