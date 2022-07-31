const router = require('express').Router()
const controller = require('../../controllers')
const validations = require('../../middlewares/validations')

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

router.post('/', validations.activityValidations.activityCreateValidation, controller.activityController.createActivity)
