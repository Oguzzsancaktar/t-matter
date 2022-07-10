const Customer = require('../../models/customer')
const { STATUS_TYPES } = require('../../constants/constants')

const createCustomer = data => {
  return Customer.create(data)
}

const findByIdAndUpdateCustomer = (id, data) => {
  return Customer.findByIdAndUpdate(id, data)
}

const findCustomerById = (id, populate = '') => {
  return Customer.findById(id).populate(populate).lean().exec()
}

const findCustomer = (query = {}, populate = '') => {
  return Customer.find(query).populate(populate).sort({ createdAt: -1 }).lean().exec()
}

const findCustomerWithFiltersAndPopulate = ({ search, size, status }) => {
  const pipeline = []
  const match = { $match: {} }
  if (search) {
    match.$match.firstname = { $regex: search, $options: 'i' }
  }
  if (status) {
    match.$match.status = { $eq: +status }
  }
  pipeline.push(match)
  pipeline.push({
    $lookup: {
      from: 'roles',
      localField: 'role',
      foreignField: '_id',
      as: 'role'
    }
  })
  pipeline.push({ $sort: { createdAt: -1 } })
  if (size) {
    pipeline.push({ $limit: +size })
  }
  return Customer.aggregate(pipeline).exec()
}

const findActiveCustomersAndPopulateSalarySetting = () => {
  return Customer.aggregate([
    { $match: { status: { $eq: STATUS_TYPES.ACTIVE } } },
    { $lookup: { from: 'salarysettings', localField: '_id', foreignField: 'owner', as: 'salarySetting' } }
  ]).exec()
}

module.exports = {
  createCustomer,
  findByIdAndUpdateCustomer,
  findCustomerById,
  findCustomer,
  findCustomerWithFiltersAndPopulate,
  findActiveCustomersAndPopulateSalarySetting
}
