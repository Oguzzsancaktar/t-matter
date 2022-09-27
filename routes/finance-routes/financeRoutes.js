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
router.put('/installment/:installmentId/edit', controllers.financeController.editInstallment)
router.get('/installment/dashboard/chart', controllers.financeController.getInstallmentDashboardChart)
router.get('/additional-time-passed-customers', controllers.financeController.getAdditionalTimePassedCustomers)
router.get('/non-billable-passed-customers', controllers.financeController.getNonBillablePassedCustomers)

module.exports = router
