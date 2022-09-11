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
    $unwind: { path: '$steps.category', preserveNullAndEmptyArrays: true }
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
    $unwind: { path: '$steps.responsibleUser', preserveNullAndEmptyArrays: true }
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
    $unwind: { path: '$steps.location', preserveNullAndEmptyArrays: true }
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
    $unwind: { path: '$customer', preserveNullAndEmptyArrays: true }
  },
  {
    $group: {
      _id: '$_id',
      steps: { $push: '$steps' },
      name: { $first: '$name' },
      __v: { $first: '$__v' },
      customer: { $first: '$customer' },
      startDate: { $first: '$startDate' },
      totalPrice: { $first: '$totalPrice' },
      index: { $first: '$index' },
      isInvoiced: { $first: '$isInvoiced' },
      status: { $first: '$status' }
    }
  },
  // TODO created At gelmiyor
  {
    $sort: {
      startDate: -1
    }
  }
]

const createTask = data => {
  return Task.create(data)
}

const getCustomerTasks = ({ customerId, isInvoiced, search, size, status }) => {
  const $match = {}

  if (customerId) {
    $match.customer = mongoose.Types.ObjectId(customerId)
  }

  if (search) {
    $match.name = { $regex: search, $options: 'i' }
  }
  if (status && status !== '-9') {
    $match.status = { $eq: +status }
  }

  if (isInvoiced) {
    $match.isInvoiced = isInvoiced === 'true'
  }

  return Task.aggregate([
    {
      $match
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
