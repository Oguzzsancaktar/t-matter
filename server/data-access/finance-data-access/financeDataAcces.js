const FinancePlanning = require('../../models/financePlanning')
const Invoice = require('../../models/invoice')
const mongoose = require('mongoose')

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

module.exports = {
  updateFinancePlanning,
  getFinancePlanning,
  createFinancePlanning,
  createInvoice,
  getInvoicesByCustomerId
}
