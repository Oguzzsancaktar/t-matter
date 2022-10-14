const express = require('express')
const router = express.Router()
const middlewares = require('../../middlewares')
const controllers = require('../../controllers')

router.post('/seen', middlewares.authMiddlewares.checkAuth, controllers.taskController.updateTaskStepsSeen)
router.post('/transfer', middlewares.authMiddlewares.checkAuth, controllers.taskController.transferTasks)
router.get('/steps', middlewares.authMiddlewares.checkAuth, controllers.taskController.getTaskSteps)
router.put('/reorder', controllers.taskController.reorderTasks)
router.post('/postpone', controllers.taskController.postponeTask)

router.post(
  '/:customerId',
  middlewares.authMiddlewares.checkAuth,
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
router.get('/chart/task-workflow-added-monthly-analysis', controllers.taskController.getTaskCountForMonths)
router.get(
  '/chart/task-step-monthly-analysis',
  middlewares.authMiddlewares.checkAuth,
  controllers.taskController.getTaskStepMonthlyAnalysis
)

module.exports = router
