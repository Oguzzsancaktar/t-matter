const router = require('express').Router()
const controllers = require('../../controllers')
const middlewares = require('../../middlewares')

router.get('/:userId', controllers.hrTaskController.getHrTasks)
router.put('/:id', controllers.hrTaskController.updateHrTask)

module.exports = router
