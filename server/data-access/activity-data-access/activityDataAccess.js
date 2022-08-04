const Activity = require('../../models/Activity')

const getTaskActivity = taskId => {
  return Activity.find({ task: taskId }).exec()
}

const getCustomerActivity = ({ customer, step }) => {
  const obj = { customer }
  if (step) {
    obj.step = step
  }
  return Activity.find(obj).exec()
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
