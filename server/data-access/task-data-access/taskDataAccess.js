const Task = require('../../models/task')
const mongoose = require('mongoose')

const taskPopulatePipe = [
  {
    $unwind: '$steps'
  },
  {
    $lookup: {
      from: 'workflowcategories',
      localField: 'steps.category',
      foreignField: '_id',
      as: 'steps.category'
    }
  },
  {
    $unwind: '$steps.category'
  },
  {
    $lookup: {
      from: 'users',
      localField: 'steps.responsibleUser',
      foreignField: '_id',
      as: 'steps.responsibleUser'
    }
  },
  {
    $unwind: '$steps.responsibleUser'
  },
  {
    $lookup: {
      from: 'locations',
      localField: 'steps.location',
      foreignField: '_id',
      as: 'steps.location'
    }
  },
  {
    $unwind: '$steps.location'
  },
  {
    $lookup: {
      from: 'customers',
      localField: 'customer',
      foreignField: '_id',
      as: 'customer'
    }
  },
  {
    $unwind: '$customer'
  },
  {
    $group: {
      _id: '$_id',
      steps: { $push: '$steps' },
      name: { $first: '$name' },
      __v: { $first: '$__v' },
      customer: { $first: '$customer' },
      startDate: { $first: '$startDate' }
    }
  }
]

const createTask = data => {
  return Task.create(data)
}

const getCustomerTasks = customerId => {
  return Task.aggregate([
    {
      $match: {
        customer: mongoose.Types.ObjectId(customerId)
      }
    },
    ...taskPopulatePipe
  ]).exec()
}

const getTaskById = taskId => {
  return Task.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(taskId)
      }
    },
    ...taskPopulatePipe
  ]).exec()
}

const updateTaskById = (taskId, data) => {
  return Task.findByIdAndUpdate(taskId, data, { new: true }).exec()
}

module.exports = {
  createTask,
  getCustomerTasks,
  getTaskById,
  updateTaskById
}
