const Activity = require('../../models/Activity')
const mongoose = require('mongoose')
const populateActivity = [
  {
    $lookup: {
      from: 'customers',
      localField: 'customer',
      foreignField: '_id',
      as: 'customer'
    }
  },
  {
    $lookup: {
      from: 'users',
      localField: 'owner',
      foreignField: '_id',
      as: 'owner'
    }
  },
  {
    $lookup: {
      from: 'tasks',
      localField: 'task',
      foreignField: '_id',
      as: 'task'
    }
  },
  {
    $unwind: {
      path: '$customer',
      preserveNullAndEmptyArrays: true
    }
  },
  {
    $unwind: {
      path: '$owner',
      preserveNullAndEmptyArrays: true
    }
  },
  {
    $unwind: {
      path: '$task',
      preserveNullAndEmptyArrays: true
    }
  }
]

const getTaskActivity = ({ task, step }) => {
  const obj = {
    task: mongoose.Types.ObjectId(task)
  }
  if (step) {
    obj.step = { $eq: +step }
  }
  return Activity.aggregate([
    {
      $match: obj
    },
    ...populateActivity
  ]).exec()
}

const getCustomerActivity = ({ customer }) => {
  return Activity.aggregate([
    {
      $match: {
        customer: { $eq: mongoose.Types.ObjectId(customer) }
      }
    },
    ...populateActivity
  ]).exec()
}

const getAllActivity = () => {
  return Activity.aggregate(populateActivity).exec()
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
