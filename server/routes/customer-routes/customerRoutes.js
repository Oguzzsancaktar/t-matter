const express = require('express')
const router = express.Router()
const middlewares = require('../../middlewares')
const controllers = require('../../controllers')

router.post(
  '/',
  middlewares.validations.customerValidations.createCustomerValidation,
  controllers.customerController.createCustomer
)

router.patch(
  '/',
  middlewares.validations.customerValidations.updateCustomerValidation,
  controllers.customerController.updateCustomer
)

router.get(
  '/:id',
  middlewares.validations.customerValidations.getCustomerValidation,
  controllers.customerController.getCustomer
)

router.patch(
  '/:id/status',
  middlewares.validations.customerValidations.statusUpdateCustomerValidation,
  controllers.customerController.updateCustomer
)

router.get('/', controllers.customerController.getCustomers)

module.exports = router
