const express = require('express')
const router = express.Router()
const middlewares = require('../../middlewares')
const controllers = require('../../controllers')

router.put('/plan', controllers.financeController.updateFinancePlanning)
router.get('/plan', controllers.financeController.getFinancePlanning)
router.get('/invoice/:customerId', controllers.financeController.getInvoices)
router.post('/invoice', controllers.financeController.createInvoice)

module.exports = router
