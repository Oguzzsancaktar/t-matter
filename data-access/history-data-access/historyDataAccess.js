const mongoose = require('mongoose')
const History = require('../../models/history')

const getCustomerFinanceHistory = ({ customerId, installmentId, invoiceId, userId }) => {
  const aggregate = []
  const $match = {}
  if (userId) {
    $match.user = mongoose.Types.ObjectID(userId)
    const $lookup = {
      from: 'users',
      localField: 'user',
      foreignField: '_id',
      as: 'user'
    }
    aggregate.push({ $lookup })
  }
  if (invoiceId) {
    $match.invoice = mongoose.Types.ObjectID(invoiceId)
    const $lookup = {
      from: 'invoices',
      localField: 'invoice',
      foreignField: '_id',
      as: 'invoice'
    }
    aggregate.push({ $lookup })
  }
  if (customerId) {
    $match.customer = mongoose.Types.ObjectID(customerId)
    const $lookup = {
      from: 'customers',
      localField: 'customer',
      foreignField: '_id',
      as: 'customer'
    }
    aggregate.push({ $lookup })
  }
  if (installmentId) {
    $match.installment = mongoose.Types.ObjectID(installmentId)
    const $lookup = {
      from: 'installments',
      localField: 'installment',
      foreignField: '_id',
      as: 'installment'
    }
    aggregate.push({ $lookup })
  }
  aggregate.unshift({ $match })
  return History.aggregate(aggregate)
}

const createHistory = body => {
  return History.create(body)
}

module.exports = {
  getCustomerFinanceHistory,
  createHistory
}
