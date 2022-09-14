const CustomerType = require('../../models/dynamic-variables/customerType')

// CustomerType
const createCustomerType = data => {
  return CustomerType.create(data)
}

const getCustomerTypes = ({ search, size, status }) => {
  const pipeline = []
  const match = { $match: {} }

  if (search && search !== 'undefined') {
    match.$match.$or = [
      {
        name: { $regex: search, $options: 'i' }
      }
    ]
  }

  if (status && status !== '-9') {
    match.$match.status = { $eq: +status }
  }

  pipeline.push(match)
  pipeline.push({ $sort: { createdAt: -1 } })

  if (size) {
    pipeline.push({ $limit: +size })
  }

  pipeline.push(
    { $lookup: { from: 'colors', localField: 'color', foreignField: '_id', as: 'color' } },
    {
      $unwind: {
        path: '$color',
        preserveNullAndEmptyArrays: true
      }
    }
  )

  return CustomerType.aggregate(pipeline).exec()
}

const findCustomerTypeById = (id, populate = '') => {
  return CustomerType.findById(id).populate(populate).lean().exec()
}

const findByIdAndUpdateCustomerType = (id, data) => {
  return CustomerType.findByIdAndUpdate(id, data)
}

module.exports = {
  createCustomerType,
  getCustomerTypes,
  findCustomerTypeById,
  findByIdAndUpdateCustomerType
}
