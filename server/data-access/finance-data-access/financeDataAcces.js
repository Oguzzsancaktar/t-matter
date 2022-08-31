const mongoose = require('mongoose')
const Invoice = require('../../models/invoice')
const FinancePlanning = require('../../models/financePlanning')
const ExpiredTaskStep = require('../../models/expiredTaskStep')
const { object } = require('joi')

const createFinancePlanning = data => {
  return FinancePlanning.create(data)
}

const updateFinancePlanning = data => {
  return FinancePlanning.findOneAndUpdate({}, data)
}

const getFinancePlanning = () => {
  return FinancePlanning.findOne({})
}

const createInvoice = data => {
  return Invoice.create(data)
}

const getInvoicesByCustomerId = customerId => {
  return Invoice.aggregate([
    { $match: { customer: mongoose.Types.ObjectId(customerId) } },
    {
      $lookup: {
        from: 'tasks',
        localField: 'tasks',
        foreignField: '_id',
        as: 'tasks'
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
      $lookup: {
        from: 'invoicecategories',
        localField: 'category',
        foreignField: '_id',
        as: 'category'
      }
    },
    {
      $lookup: {
        from: 'expiredtasksteps',
        localField: 'expiredTaskSteps',
        foreignField: '_id',
        as: 'expiredTaskSteps'
      }
    },
    {
      $unwind: {
        path: '$expiredTaskSteps',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $lookup: {
        from: 'tasks',
        localField: 'expiredTaskSteps.task',
        foreignField: '_id',
        as: 'expiredTaskSteps.task'
      }
    },
    {
      $unwind: {
        path: '$expiredTaskSteps.task',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group: {
        _id: '$_id',
        category: { $first: '$category' },
        customer: { $first: '$customer' },
        total: { $first: '$total' },
        amount: { $first: '$amount' },
        discount: { $first: '$discount' },
        tasks: { $first: '$tasks' },
        expiredTaskSteps: {
          $push: {
            $cond: [{ $ne: ['$expiredTaskSteps', {}] }, '$expiredTaskSteps', '$$REMOVE']
          }
        },
        index: { $first: '$index' },
        createdAt: { $first: '$createdAt' }
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
        path: '$category',
        preserveNullAndEmptyArrays: true
      }
    }
  ]).exec()
}

const createExpiredTaskStep = data => {
  return ExpiredTaskStep.create(data)
}

const getExpiredTaskStepsByCustomerId = customerId => {
  return ExpiredTaskStep.aggregate([
    {
      $match: {
        isInvoiced: false,
        customer: mongoose.Types.ObjectId(customerId)
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
        path: '$task',
        preserveNullAndEmptyArrays: true
      }
    }
  ])
}

const updateExpiredTaskStepById = (id, data) => {
  return ExpiredTaskStep.findByIdAndUpdate(id, data)
}

module.exports = {
  updateFinancePlanning,
  getFinancePlanning,
  createFinancePlanning,
  createInvoice,
  getInvoicesByCustomerId,
  getExpiredTaskStepsByCustomerId,
  createExpiredTaskStep,
  updateExpiredTaskStepById
}
