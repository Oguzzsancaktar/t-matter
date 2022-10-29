const CustomerHistory = require('../../models/customerHistory')
const mongoose = require('mongoose')

const createCustomerHistory = data => {
  return CustomerHistory.create(data)
}

const getCustomerHistories = async customerId => {
  const pipeline = []

  const $match = {}

  if (customerId) {
    $match.customer = mongoose.Types.ObjectId(customerId)
  }

  pipeline.push({ $match })

  pipeline.push({
    $lookup: {
      from: 'customers',
      localField: 'customer',
      foreignField: '_id',
      as: 'customer'
    }
  })

  pipeline.push({
    $unwind: {
      path: '$customer',
      preserveNullAndEmptyArrays: true
    }
  })

  pipeline.push({
    $lookup: {
      from: 'users',
      localField: 'responsible',
      foreignField: '_id',
      as: 'responsible'
    }
  })

  pipeline.push({
    $unwind: {
      path: '$responsible',
      preserveNullAndEmptyArrays: true
    }
  })

  pipeline.push({
    $sort: {
      createdAt: -1
    }
  })

  return CustomerHistory.aggregate(pipeline).exec()
}

module.exports = {
  createCustomerHistory,
  getCustomerHistories
}
