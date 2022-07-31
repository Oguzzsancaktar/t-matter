const express = require('express')
const router = express.Router()
const middlewares = require('../../middlewares')
const controllers = require('../../controllers')

router.post(
  '/:customerId',
  middlewares.validations.taskValidations.createTaskValidation,
  controllers.taskController.createTask
)

router.get(
  '/customer/:customerId',
  middlewares.validations.taskValidations.getTasksValidation,
  controllers.taskController.getTasks
)

router.get('/:taskId', middlewares.validations.taskValidations.getTaskValidation, controllers.taskController.getTask)

router.put('/:taskId', controllers.taskController.updateTask)

module.exports = router
