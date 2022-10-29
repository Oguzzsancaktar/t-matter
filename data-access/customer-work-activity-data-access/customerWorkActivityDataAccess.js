const CustomerWorkActivity = require('../../models/customerWorkActivity')
const mongoose = require('mongoose')

const createCustomerWorkActivity = data => {
  return CustomerWorkActivity.create(data)
}

const getCustomerWorkActivities = async customerId => {
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
      localField: 'creator',
      foreignField: '_id',
      as: 'creator'
    }
  })

  pipeline.push({
    $unwind: {
      path: '$creator',
      preserveNullAndEmptyArrays: true
    }
  })

  pipeline.push({
    $sort: {
      createdAt: -1
    }
  })
  return CustomerWorkActivity.aggregate(pipeline).exec()
}

module.exports = {
  createCustomerWorkActivity,
  getCustomerWorkActivities
}
