const mongoose = require('mongoose')
const Invoice = require('../../models/invoice')
const FinancePlanning = require('../../models/financePlanning')
const ExpiredTaskStep = require('../../models/expiredTaskStep')
const Installment = require('../../models/installment')

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

const updateInvoiceById = (id, data) => {
  return Invoice.findByIdAndUpdate(id, data)
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
        createdAt: { $first: '$createdAt' },
        postponeCount: { $first: '$postponeCount' }
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

const getExpiredTaskStepsByCustomerId = ({ customerId, isInvoiced }) => {
  const $match = {
    customer: mongoose.Types.ObjectId(customerId)
  }
  if (isInvoiced) {
    $match.isInvoiced = { $eq: isInvoiced === 'true' }
  }
  return ExpiredTaskStep.aggregate([
    {
      $match
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
        localField: 'user',
        foreignField: '_id',
        as: 'user'
      }
    },
    {
      $unwind: {
        path: '$task',
        preserveNullAndEmptyArrays: true
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
        path: '$user',
        preserveNullAndEmptyArrays: true
      }
    }
  ])
}

const updateExpiredTaskStepById = (id, data) => {
  return ExpiredTaskStep.findByIdAndUpdate(id, data)
}

const createInstallment = data => {
  return Installment.create(data)
}

const updateInstallment = (id, data) => {
  return Installment.findByIdAndUpdate(id, data, { new: true })
}

const getInstallmentsByInvoiceId = invoiceId => {
  return Installment.aggregate([
    {
      $match: {
        invoice: mongoose.Types.ObjectId(invoiceId)
      }
    },
    {
      $lookup: {
        from: 'invoices',
        localField: 'invoice',
        foreignField: '_id',
        as: 'invoice'
      }
    },
    {
      $unwind: {
        path: '$invoice',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $sort: {
        payDate: 1
      }
    }
  ])
}

const getInstallmentById = id => {
  return Installment.findById(id)
}

const updateManyInstallment = (query, data) => {
  return Installment.updateMany(query, data)
}

module.exports = {
  updateFinancePlanning,
  getFinancePlanning,
  createFinancePlanning,
  createInvoice,
  getInvoicesByCustomerId,
  getExpiredTaskStepsByCustomerId,
  createExpiredTaskStep,
  updateExpiredTaskStepById,
  createInstallment,
  updateInstallment,
  getInstallmentsByInvoiceId,
  getInstallmentById,
  updateInvoiceById,
  updateManyInstallment
}
