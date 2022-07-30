const Customer = require('../../models/customer')
const { STATUS_TYPES } = require('../../constants/constants')
const mongoose = require('mongoose')

const createCustomer = data => {
  return Customer.create(data)
}

const findByIdAndUpdateCustomer = (id, data) => {
  return Customer.findByIdAndUpdate(id, data)
}

const findCustomerById = async (id, populate = '') => {
  const [customer] = await Customer.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(id) } },
    {
      $lookup: {
        from: 'refferedbies',
        localField: 'refferedBy',
        foreignField: '_id',
        as: 'refferedBy'
      }
    },
    {
      $unwind: {
        path: '$refferedBy'
      }
    },
    {
      $unwind: {
        path: '$reliableCustomers'
      }
    },
    {
      $lookup: {
        from: 'customers',
        localField: 'reliableCustomers.reliableId',
        foreignField: '_id',
        as: 'reliableCustomers.reliable'
      }
    },
    {
      $lookup: {
        from: 'relativetypes',
        localField: 'reliableCustomers.relativeType.relativeTypeId',
        foreignField: '_id',
        as: 'reliableCustomers.relativeType.relativeType'
      }
    },
    {
      $unwind: {
        path: '$reliableCustomers.reliable'
      }
    },
    {
      $unwind: {
        path: '$reliableCustomers.relativeType.relativeType'
      }
    },
    {
      $group: {
        _id: '$_id',
        firstname: { $first: '$firstname' },
        lastname: { $first: '$lastname' },
        email: { $first: '$email' },
        phone: { $first: '$phone' },
        status: { $first: '$status' },
        createdAt: { $first: '$createdAt' },
        updatedAt: { $first: '$updatedAt' },
        refferedBy: { $first: '$refferedBy' },
        customerType: { $first: '$customerType' },
        reliableCustomers: { $push: '$reliableCustomers' }
      }
    }
  ]).exec()
  return customer
}

const findCustomer = (query = {}, populate = '') => {
  return Customer.find(query).populate(populate).sort({ createdAt: -1 }).lean().exec()
}

const findCustomerWithFiltersAndPopulate = ({ search, size, status }) => {
  const pipeline = []
  const match = { $match: {} }
  if (search && search !== 'undefined') {
    match.$match.$or = [
      { firstname: { $regex: search, $options: 'i' } },
      { lastname: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { phone: { $regex: search, $options: 'i' } }
    ]
  }

  if (status) {
    match.$match.status = { $eq: +status }
  }
  pipeline.push(match)
  pipeline.push(
    {
      $lookup: {
        from: 'refferedbies',
        localField: 'refferedBy',
        foreignField: '_id',
        as: 'refferedBy'
      }
    },
    {
      $unwind: {
        path: '$refferedBy'
      }
    }
  )
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
