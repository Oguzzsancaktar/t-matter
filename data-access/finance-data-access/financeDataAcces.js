const mongoose = require('mongoose')
const Invoice = require('../../models/invoice')
const FinancePlanning = require('../../models/financePlanning')
const ExpiredTaskStep = require('../../models/expiredTaskStep')
const Installment = require('../../models/installment')
const Task = require('../../models/task')
const { INSTALLMENT_STATUS } = require('../../constants/finance')
const { PERIODS } = require('../../constants/constants')
const moment = require('moment')
const { getISODate } = require('../../helpers/dateHelpers')
const { withoutTimezone } = require('../../utils/date-utils/dateUtils')

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

const getInvoiceById = id => {
  return Invoice.findById(id).exec()
}

const getInvoicesByCustomerId = customerId => {
  const $match = {}
  if (customerId) {
    $match.customer = mongoose.Types.ObjectId(customerId)
  }
  return Invoice.aggregate([
    { $match },
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
  return ExpiredTaskStep.create(data, { new: true }).exec()
}

const getExpiredTaskStepsByCustomerId = ({ customerId, isInvoiced }) => {
  const $match = {}
  if (customerId) {
    $match.customer = mongoose.Types.ObjectId(customerId)
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

const getPassedExpiredTasksStepsGroupedByCustomer = async () => {
  const financePlanning = await getFinancePlanning()

  return ExpiredTaskStep.aggregate([
    {
      $match: {
        isInvoiced: false
      }
    },
    {
      $group: {
        _id: '$customer',
        total: { $sum: '$expiredTimePrice' }
      }
    },
    {
      $match: {
        total: { $gte: financePlanning.inactiveTimeSlipAmount.value }
      }
    },
    {
      $lookup: {
        from: 'customers',
        localField: '_id',
        foreignField: '_id',
        as: 'customer'
      }
    },
    {
      $unwind: {
        path: '$customer',
        preserveNullAndEmptyArrays: true
      }
    }
  ]).exec()
}

const getPassedNonBillableTasksGroupedByCustomer = async () => {
  const financePlanning = await getFinancePlanning()

  return Task.aggregate([
    {
      $match: {
        isInvoiced: false
      }
    },
    {
      $group: {
        _id: '$customer',
        total: { $sum: '$totalPrice' }
      }
    },
    {
      $match: {
        total: { $gte: financePlanning.activeTimeSlipAmount.value }
      }
    },
    {
      $lookup: {
        from: 'customers',
        localField: '_id',
        foreignField: '_id',
        as: 'customer'
      }
    },
    {
      $unwind: {
        path: '$customer',
        preserveNullAndEmptyArrays: true
      }
    }
  ]).exec()
}

const updateExpiredTaskStepById = (id, data) => {
  return ExpiredTaskStep.findByIdAndUpdate(id, data)
}

const createInstallment = data => {
  return Installment.create(data)
}

const updateInstallment = (id, data) => {
  return Installment.findByIdAndUpdate(id, data, { new: true }).exec()
}

const getInstallmentsByInvoiceId = ({ invoiceId, startDate, endDate, status }) => {
  const $match = {
    $and: []
  }
  if (invoiceId) {
    $match.$and.push({ invoice: { $eq: mongoose.Types.ObjectId(invoiceId) } })
  }
  if (startDate) {
    $match.$and.push({ payDate: { $gte: withoutTimezone(startDate) } })
  }
  if (endDate) {
    $match.$and.push({ payDate: { $lte: withoutTimezone(endDate) } })
  }
  if (status && status !== 'ALL') {
    $match.$and.push({ status: { $eq: status } })
  }
  if ($match.$and.length === 0) {
    delete $match.$and
  }
  return Installment.aggregate([
    {
      $match
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
      $lookup: {
        from: 'customers',
        localField: 'invoice.customer',
        foreignField: '_id',
        as: 'invoice.customer'
      }
    },
    {
      $unwind: {
        path: '$invoice.customer',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $lookup: {
        from: 'invoicecategories',
        localField: 'invoice.category',
        foreignField: '_id',
        as: 'invoice.category'
      }
    },
    {
      $unwind: {
        path: '$invoice.category',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $sort: {
        payDate: 1
      }
    }
  ]).exec()
}

const getInstallmentById = id => {
  return Installment.findById(id)
}

const updateManyInstallment = (query, data) => {
  return Installment.updateMany(query, data)
}

const deleteManyInstallment = query => {
  return Installment.deleteMany(query)
}

const getDailyGroupedInstallments = ({ period, startDate, endDate }) => {
  const $match = {}
  const $dateToString = {
    format: '%Y-%m-%d',
    date: '$payDate'
  }
  if (period === PERIODS.DAILY) {
    $match.payDate = {
      $gte: getISODate(moment().startOf('day')),
      $lte: getISODate(moment().endOf('day'))
    }
  }
  if (period === PERIODS.WEEKLY) {
    $match.payDate = {
      $gte: getISODate(moment().startOf('isoWeek')),
      $lte: getISODate(moment().endOf('isoWeek'))
    }
  }
  if (period === PERIODS.MONTHLY) {
    $match.payDate = {
      $gte: getISODate(moment().startOf('month')),
      $lte: getISODate(moment().endOf('month'))
    }
    $dateToString.format = '%Y-%m'
  }
  if (period === PERIODS.YEARLY) {
    $match.payDate = {
      $gte: getISODate(moment().startOf('year')),
      $lte: getISODate(moment().endOf('year'))
    }
    $dateToString.format = '%Y'
  }
  if (startDate && endDate) {
    $match.payDate = {
      $gte: withoutTimezone(startDate),
      $lte: withoutTimezone(endDate)
    }
  }
  const agg = () => [
    { $match },
    {
      $group: {
        _id: {
          $dateToString
        },
        unpaidAmount: {
          $sum: {
            $cond: [{ $ne: ['$status', INSTALLMENT_STATUS.PAID] }, '$payAmount', 0]
          }
        },
        paidAmount: {
          $sum: {
            $cond: [{ $eq: ['$status', INSTALLMENT_STATUS.PAID] }, '$payAmount', 0]
          }
        },
        paidCount: {
          $sum: {
            $cond: [{ $eq: ['$status', INSTALLMENT_STATUS.PAID] }, 1, 0]
          }
        },
        unpaidCount: {
          $sum: {
            $cond: [{ $ne: ['$status', INSTALLMENT_STATUS.PAID] }, 1, 0]
          }
        },
        totalAmount: {
          $sum: '$payAmount'
        },
        totalCount: {
          $sum: 1
        },
        payDate: {
          $first: '$payDate'
        }
      }
    },
    {
      $sort: {
        _id: 1
      }
    }
  ]

  return Installment.aggregate(agg()).exec()
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
  updateManyInstallment,
  deleteManyInstallment,
  getInvoiceById,
  getDailyGroupedInstallments,
  getPassedExpiredTasksStepsGroupedByCustomer,
  getPassedNonBillableTasksGroupedByCustomer
}
