const express = require('express')
const router = express.Router()
const middlewares = require('../../middlewares')
const controllers = require('../../controllers')

router.put('/reorder', controllers.taskController.reorderTasks)
router.post('/postpone', controllers.taskController.postponeTask)

router.post(
  '/:customerId',
  middlewares.validations.taskValidations.createTaskValidation,
  controllers.taskController.createTask
)

router.get('/', controllers.taskController.getAllTaskList)

router.get(
  '/customer/:customerId',
  middlewares.validations.taskValidations.getTasksValidation,
  controllers.taskController.getTasks
)

router.delete('/:taskId', controllers.taskController.removeTask)

router.get('/:taskId', middlewares.validations.taskValidations.getTaskValidation, controllers.taskController.getTask)

router.put('/:taskId', controllers.taskController.updateTask)

router.get('/chart/most-used-workflow', controllers.taskController.usedTaskWorkflowCounts)

module.exports = router
