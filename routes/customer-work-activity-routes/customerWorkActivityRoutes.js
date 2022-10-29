const router = require('express').Router()
const controllers = require('../../controllers')
const middlewares = require('../../middlewares')

router.post(
  '/',
  middlewares.validations.customerWorkActivityValidations.createCustomerWorkActivityValidation,
  controllers.customerWorkActivityController.createCustomerWorkActivity
)
router.get('/:customerId', controllers.customerWorkActivityController.getCustomerWorkActivities)

module.exports = router
