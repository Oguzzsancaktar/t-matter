const Activity = require('../../models/Activity')

const getTaskActivity = taskId => {
  return Activity.find({ task: taskId }).exec()
}

const getCustomerActivity = customerId => {
  return Activity.find({ customer: customerId }).exec()
}

const getAllActivity = () => {
  return Activity.find().exec()
}

const createActivity = data => {
  return Activity.create(data)
}

module.exports = {
  getTaskActivity,
  getCustomerActivity,
  getAllActivity,
  createActivity
}
