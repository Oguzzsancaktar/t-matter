const express = require('express')
const router = express.Router()
const middlewares = require('../../middlewares')
const controllers = require('../../controllers')

router.put('/plan', controllers.financeController.updateFinancePlanning)
router.get('/plan', controllers.financeController.getFinancePlanning)
router.get('/invoice/:customerId?', controllers.financeController.getInvoices)
router.post('/invoice', controllers.financeController.createInvoice)
router.get('/invoice/expired/:customerId', controllers.financeController.getExpiredTaskSteps)
router.post(
  '/invoice/expired',
  middlewares.authMiddlewares.checkAuth,
  controllers.financeController.createExpiredTaskStep
)
router.post('/installment/:invoiceId', controllers.financeController.createInstallment)
router.get('/installment/:invoiceId?', controllers.financeController.getInstallments)
router.put('/installment/:invoiceId/postpone/:installmentId', controllers.financeController.postponeInstallment)
router.put('/installment/:invoiceId/pay/:installmentId', controllers.financeController.payInstallment)
router.put('/installment/:invoiceId/reset', controllers.financeController.resetInstallments)

module.exports = router
