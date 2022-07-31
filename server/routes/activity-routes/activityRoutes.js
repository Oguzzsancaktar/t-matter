const express = require('express')
const router = express.Router()
const controller = require('../../controllers')
const middlewares = require('../../middlewares')

router.get('/', (req, res) => {
  const { customer, task } = req.query
  if (task) {
    return controller.activityController.getTaskActivity(req, res)
  }
  if (customer) {
    return controller.activityController.getCustomerActivity(req, res)
  }
  return controller.activityController.getAllActivity(req, res)
})

router.post(
  '/',
  middlewares.validations.activityValidations.activityCreateValidation,
  controller.activityController.createActivity
)

module.exports = router
