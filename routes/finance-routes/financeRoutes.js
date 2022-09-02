const express = require('express')
const router = express.Router()
const middlewares = require('../../middlewares')
const controllers = require('../../controllers')

router.put('/plan', controllers.financeController.updateFinancePlanning)
router.get('/plan', controllers.financeController.getFinancePlanning)
router.get('/invoice/:customerId', controllers.financeController.getInvoices)
router.post('/invoice', controllers.financeController.createInvoice)
router.get('/invoice/expired/:customerId', controllers.financeController.getExpiredTaskSteps)
router.post('/invoice/expired', controllers.financeController.createExpiredTaskStep)
router.post('/invoice/installment/:invoiceId', controllers.financeController.createInstallment)

module.exports = router
