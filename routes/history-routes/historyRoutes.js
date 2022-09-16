const express = require('express')
const router = express.Router()
const middlewares = require('../../middlewares')
const controllers = require('../../controllers')

router.get('/finance', controllers.historyController.getFinanceHistoryController)
router.post('/', controllers.historyController.createHistoryController)

module.exports = router
