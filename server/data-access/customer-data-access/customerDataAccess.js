const Customer = require('../../models/customer')
const { STATUS_TYPES } = require('../../constants/constants')
const mongoose = require('mongoose')

const createCustomer = data => {
  return Customer.create(data)
}

const findByIdAndUpdateCustomerForCreate = (id, data) => {
  return Customer.findByIdAndUpdate(id, data)
}
const findByIdAndUpdateCustomer = async (id, data) => {
  const deletedReliableIdArr = data['deleteReliableId']
  const reliableInCompanyArr = data['reliableInCompany']

  let reliableCustomers = []

  for (let customerId of deletedReliableIdArr) {
    const customer = await Customer.findById(customerId)
    customer.reliableCustomers = customer.reliableCustomers.filter(reliable => reliable.reliableId.toString() !== id)
    Customer.findByIdAndUpdate(customerId, customer)
  }

  for (let reliable of reliableInCompanyArr) {
    const reliableId = reliable._id
    const relativeType = {
      relativeTypeId: mongoose.Types.ObjectId(reliable.relativeType._id),
      fromOrTo: 0
    }

    reliableCustomers.push({ reliableId: mongoose.Types.ObjectId(reliableId), relativeType })
  }

  if (reliableCustomers.length) {
    data.reliableCustomers = reliableCustomers
  }

  for (let reliableCustomer of reliableCustomers) {
    const customerId = reliableCustomer.reliableId
    const relativeTypeId = reliableCustomer.relativeType.relativeTypeId
    await Customer.findByIdAndUpdate(customerId, {
      $push: {
        reliableCustomers: {
          reliableId: mongoose.Types.ObjectId(id),
          relativeType: {
            relativeTypeId: mongoose.Types.ObjectId(relativeTypeId),
            fromOrTo: 1
          }
        }
      }
    })
  }

  return await Customer.findByIdAndUpdate(id, data)
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
        path: '$refferedBy',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $unwind: {
        path: '$reliableCustomers',
        preserveNullAndEmptyArrays: true
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
        path: '$reliableCustomers.reliable',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $unwind: {
        path: '$reliableCustomers.relativeType.relativeType',
        preserveNullAndEmptyArrays: true
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
        gender: { $first: '$gender' },
        jobTitle: { $first: '$jobTitle' },

        aSharpNumber: { $first: '$aSharpNumber' },
        country: { $first: '$country' },
        city: { $first: '$city' },
        state: { $first: '$state' },
        address: { $first: '$address' },
        zipcode: { $first: '$zipcode' },
        birthday: { $first: '$birthday' },
        birthplace: { $first: '$birthplace' },

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

  if (status && status !== '-9') {
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
        path: '$refferedBy',
        preserveNullAndEmptyArrays: true
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
  findActiveCustomersAndPopulateSalarySetting,

  findByIdAndUpdateCustomerForCreate
}
