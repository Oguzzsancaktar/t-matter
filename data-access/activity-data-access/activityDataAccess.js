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

const getAllActivity = (userId, type) => {
  const tempPipeline = []

  if (userId) {
    tempPipeline.push({
      $match: {
        owner: { $eq: mongoose.Types.ObjectId(userId) }
      }
    })
  }

  if (type && type.toString() !== '-9') {
    tempPipeline.push({
      $match: {
        type: { $eq: +type }
      }
    })
  }

  return Activity.aggregate([...tempPipeline, ...populateActivity]).exec()
}

const createActivity = data => {
  return Activity.create(data)
}

const getActivityCategoryCounts = userId => {
  if (userId) {
  }

  return Activity.aggregate([
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
