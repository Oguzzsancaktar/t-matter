const Activity = require('../../models/activity')
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
  },
  {
    $sort: {
      createdAt: -1
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

const getAllActivity = (userId, customerId, categoryId) => {
  const tempPipeline = []

  if (userId && userId?.trim().length > 0) {
    tempPipeline.push({
      $match: {
        owner: { $eq: mongoose.Types.ObjectId(userId) }
      }
    })
  }

  if (customerId && customerId?.trim().length > 0) {
    tempPipeline.push({
      $match: {
        customer: { $eq: mongoose.Types.ObjectId(customerId) }
      }
    })
  }

  if (categoryId && categoryId?.trim().length > 0) {
    tempPipeline.push({
      $match: {
        stepCategory: { $eq: mongoose.Types.ObjectId(categoryId) }
      }
    })
  }

  return Activity.aggregate([...tempPipeline, ...populateActivity]).exec()
}

const createActivity = data => {
  return Activity.create(data)
}

const getActivityCategoryCounts = (categoryId, customerId, userId) => {
  console.log(111, customerId)
  const pipeline = []

  if (userId && userId?.trim().length > 0) {
    pipeline.push({
      $match: {
        owner: { $eq: mongoose.Types.ObjectId(userId) }
      }
    })
  }

  if (customerId && customerId?.trim().length > 0) {
    pipeline.push({
      $match: {
        customer: { $eq: mongoose.Types.ObjectId(customerId) }
      }
    })
  }
  const pipeFirst = [
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
        path: '$task',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $project: {
        step: {
          $arrayElemAt: ['$task.steps', '$step']
        }
      }
    },
    {
      $lookup: {
        from: 'workflowcategories',
        localField: 'step.category',
        foreignField: '_id',
        as: 'category'
      }
    },
    {
      $unwind: {
        path: '$category',
        preserveNullAndEmptyArrays: true
      }
    }
  ]

  pipeline.push(...pipeFirst)
  if (categoryId) {
    pipeline.push({ $match: { 'category._id': mongoose.Types.ObjectId(categoryId) } })
  }

  // if (userId) {
  //   pipeline.push({ $match: { 'category._id': mongoose.Types.ObjectId(userId) } })
  // }

  return Activity.aggregate([
    ...pipeline,
    {
      $lookup: {
        from: 'colors',
        localField: 'category.color',
        foreignField: '_id',
        as: 'category.color'
      }
    },
    {
      $unwind: {
        path: '$category.color',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group: {
        _id: '$category',
        count: {
          $sum: 1
        }
      }
    }
  ])
}

module.exports = {
  getTaskActivity,
  getCustomerActivity,
  getAllActivity,
  createActivity,
  getActivityCategoryCounts
}
