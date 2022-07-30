const express = require('express')
const router = express.Router()
const middlewares = require('../../middlewares')
const controllers = require('../../controllers')

router.post('/:customerId', middlewares.validations.taskValidations.createTaskValidation, controllers.taskController.createTask)

router.get('/:customerId', middlewares.validations.taskValidations.getTasksValidation, controllers.taskController.getTasks)

module.exports = router
