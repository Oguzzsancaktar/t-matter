const Task = require('../../models/task')
const mongoose = require('mongoose')
const calculateHourlyCompanyFee = require('../../helpers/calculateHourlyCompanyFee')
const moment = require('moment')

const taskPopulatePipe = [
  {
    $unwind: { path: '$steps', preserveNullAndEmptyArrays: true }
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
      localField: 'steps.addedFrom',
      foreignField: '_id',
      as: 'steps.addedFrom'
    }
  },
  {
    $unwind: {
      path: '$steps.addedFrom',
      preserveNullAndEmptyArrays: true
    }
  },
  {
    $lookup: {
      from: 'colors',
      localField: 'steps.category.color',
      foreignField: '_id',
      as: 'steps.category.color'
    }
  },
  {
    $unwind: {
      path: '$steps.category.color',
      preserveNullAndEmptyArrays: true
    }
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
      totalDuration: { $first: '$totalDuration' },
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

const getCustomerTasks = ({ customerId, isInvoiced, search, size, status, userId, categoryId }) => {
  console.log(categoryId, customerId, isInvoiced, search, size, status, userId)
  const $match = {}

  if (customerId && customerId.trim().length > 0) {
    $match.customer = mongoose.Types.ObjectId(customerId)
  }

  if (categoryId && categoryId.trim().length > 0) {
    $match.customer = mongoose.Types.ObjectId(categoryId)
  }

  if (userId && userId.trim().length > 0) {
    $match.customer = mongoose.Types.ObjectId(userId)
  }

  if (search && search.trim().length > 0) {
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

const deleteTaskById = taskId => {
  return Task.findByIdAndDelete(taskId)
}

const updateTaskById = (taskId, data) => {
  return Task.findByIdAndUpdate(taskId, data, { new: true }).exec()
}

const getUsedTaskWorkflowCounts = (taskId, data) => {
  const pipeline = [
    {
      $group: {
        _id: '$workflowId',
        count: {
          $sum: 1
        }
      }
    },
    {
      $lookup: {
        from: 'workflowplans',
        localField: '_id',
        foreignField: '_id',
        as: 'workflow'
      }
    },
    {
      $unwind: {
        path: '$workflow',
        preserveNullAndEmptyArrays: true
      }
    }
  ]
  return Task.aggregate(pipeline).exec()
}

const getTaskCountForMonthsData = async () => {
  const pipeline = [
    {
      $group: {
        _id: { $month: '$createdAt' },
        count: { $sum: 1 }
      }
    }
  ]

  return Task.aggregate(pipeline).exec()
}

const getTaskStepMonthlyAnalysisData = async ({ responsibleUserId }) => {
  const { hourlyCompanyFee } = await calculateHourlyCompanyFee()

  const pipeline = [
    {
      $unwind: {
        path: '$steps',
        preserveNullAndEmptyArrays: true,
        includeArrayIndex: 'stepIndex'
      }
    },
    {
      $match: {
        'steps.responsibleUser': mongoose.Types.ObjectId(responsibleUserId)
      }
    },
    {
      $addFields: {
        stepDuration: {
          $sum: '$steps.checklistItems.duration'
        }
      }
    },
    {
      $addFields: {
        stepPrice: {
          $multiply: ['$stepDuration', hourlyCompanyFee]
        }
      }
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format: '%Y-%m',
            date: {
              $toDate: '$steps.startDate'
            }
          }
        },
        monthlyDuration: {
          $sum: '$stepDuration'
        },
        monthlyPrice: { $sum: '$stepPrice' }
      }
    }
  ]

  let steps = await Task.aggregate(pipeline).exec()
  steps = Array.from(new Array(12)).map((_, index) => {
    const i = steps.findIndex(s => moment(s._id).month() === index)
    if (i > -1) {
      return steps[i]
    }
    return {
      _id: moment().month(index).format('YYYY-MM'),
      monthlyDuration: 0,
      monthlyPrice: 0
    }
  })
  return steps
}

const getTaskStepsData = async ({ responsibleUserId, startDate, endDate }) => {
  const { hourlyCompanyFee } = await calculateHourlyCompanyFee()

  const $match = {}

  if (responsibleUserId) {
    $match['steps.responsibleUser'] = mongoose.Types.ObjectId(responsibleUserId)
  }

  if (startDate && endDate) {
    $match['steps.startDate'] = {
      $gte: +new Date(startDate),
      $lte: +new Date(endDate)
    }
  }

  const pipeline = [
    {
      $unwind: {
        path: '$steps',
        preserveNullAndEmptyArrays: true,
        includeArrayIndex: 'stepIndex'
      }
    },
    {
      $match
    },
    {
      $addFields: {
        stepDuration: {
          $sum: '$steps.checklistItems.duration'
        }
      }
    },
    {
      $addFields: {
        stepPrice: {
          $multiply: ['$stepDuration', hourlyCompanyFee]
        }
      }
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
      $unwind: {
        path: '$customer',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'steps.addedFrom',
        foreignField: '_id',
        as: 'steps.addedFrom'
      }
    },
    {
      $unwind: {
        path: '$steps.addedFrom',
        preserveNullAndEmptyArrays: true
      }
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
      $unwind: {
        path: '$steps.category',
        preserveNullAndEmptyArrays: true
      }
    }
  ]

  return Task.aggregate(pipeline).exec()
}

module.exports = {
  createTask,
  getCustomerTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
  getUsedTaskWorkflowCounts,
  getTaskCountForMonthsData,
  getTaskStepMonthlyAnalysisData,
  getTaskStepsData
}
