const express = require('express')
const router = express.Router()
const controller = require('../../controllers')
const middlewares = require('../../middlewares')

router.get('/', (req, res) => {
  const { customerId, task } = req.query
  if (task) {
    return controller.activityController.getTaskActivity(req, res)
  }

  return controller.activityController.getAllActivity(req, res)
})

router.get('/category-counts', (req, res) => {
  return controller.activityController.getCustomerActivityCategoryCounts(req, res)
})

router.post(
  '/',
  middlewares.validations.activityValidations.activityCreateValidation,
  controller.activityController.createActivity
)

module.exports = router
