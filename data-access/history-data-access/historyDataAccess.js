const mongoose = require('mongoose')
const History = require('../../models/history')

const getCustomerFinanceHistory = ({ customerId, installmentId, invoiceId, userId, historyType }) => {
  const aggregate = []
  const $match = {}
  if (userId) {
    $match.user = mongoose.Types.ObjectId(userId)
    const $lookup = {
      from: 'users',
      localField: 'user',
      foreignField: '_id',
      as: 'user'
    }
    const $unwind = {
      path: '$user'
    }
    aggregate.push({ $lookup }, { $unwind })
  }
  if (invoiceId) {
    $match.invoice = mongoose.Types.ObjectId(invoiceId)
    const $lookup = {
      from: 'invoices',
      localField: 'invoice',
      foreignField: '_id',
      as: 'invoice'
    }
    const $unwind = {
      path: '$invoice'
    }
    aggregate.push({ $lookup }, { $unwind })
  }
  if (customerId) {
    $match.customer = mongoose.Types.ObjectId(customerId)
    const $lookup = {
      from: 'customers',
      localField: 'customer',
      foreignField: '_id',
      as: 'customer'
    }
    const $unwind = {
      path: '$customer'
    }
    aggregate.push({ $lookup }, { $unwind })
  }
  if (installmentId) {
    $match.installment = mongoose.Types.ObjectId(installmentId)
    const $lookup = {
      from: 'installments',
      localField: 'installment',
      foreignField: '_id',
      as: 'installment'
    }
    const $unwind = {
      path: '$installment'
    }
    aggregate.push({ $lookup }, { $unwind })
  }

  if (historyType) {
    $match.type = historyType
  }

  aggregate.unshift({ $match })
  aggregate.push({ $sort: { createdAt: -1 } })
  return History.aggregate(aggregate)
}

const createHistory = body => {
  return History.create(body)
}

const removeManyHistory = filter => {
  return History.deleteMany(filter)
}

module.exports = {
  getCustomerFinanceHistory,
  createHistory,
  removeManyHistory
}
