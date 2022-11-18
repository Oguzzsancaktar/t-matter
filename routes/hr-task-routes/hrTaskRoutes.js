const router = require('express').Router()
const controllers = require('../../controllers')
const middlewares = require('../../middlewares')

router.get('/:userId', controllers.hrTaskController.getHrTasks)

module.exports = router
