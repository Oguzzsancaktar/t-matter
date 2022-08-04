const Activity = require('../../models/Activity')

const getTaskActivity = ({ task, step }) => {
  const obj = {
    task
  }
  if (step) {
    obj.step = { $eq: step }
  }
  return Activity.find(obj).exec()
}

const getCustomerActivity = ({ customer }) => {
  return Activity.find({ customer }).exec()
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
