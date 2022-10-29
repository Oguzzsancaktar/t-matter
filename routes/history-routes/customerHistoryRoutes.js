const router = require('express').Router()
const controllers = require('../../controllers')
const middlewares = require('../../middlewares')

router.post(
  '/',
  middlewares.validations.customerHistoryValidations.createCustomerHistoryValidation,
  controllers.customerHistoryController.createCustomerHistory
)
router.get('/:customerId', controllers.customerHistoryController.getCustomerHistories)

module.exports = router
