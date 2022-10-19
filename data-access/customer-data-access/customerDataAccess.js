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

  for (let i = 0; i < reliableInCompanyArr?.length; i++) {
    const reliable = reliableInCompanyArr[i]
    const { _id: reliableId, relativeType } = reliable

    const type = {
      relativeTypeId: mongoose.Types.ObjectId(relativeType._id),
      fromOrTo: 0
    }

    const reliableAndType = {
      reliableId: mongoose.Types.ObjectId(reliableId),
      relativeType: type
    }

    console.log(reliableAndType)
    reliableCustomers.push(reliableAndType)
  }

  data.reliableCustomers = reliableCustomers
  delete data.reliableInCompany

  console.log(id, data)

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
      $lookup: {
        from: 'colors',
        localField: 'refferedBy.color',
        foreignField: '_id',
        as: 'refferedBy.color'
      }
    },
    {
      $lookup: {
        from: 'jobtitles',
        localField: 'jobTitle',
        foreignField: '_id',
        as: 'jobTitle'
      }
    },
    {
      $unwind: {
        path: '$jobTitle',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $unwind: {
        path: '$refferedBy.color',
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
        reliableCustomers: { $push: '$reliableCustomers' },

        profile_img: { $first: '$profile_img' },
        cloudinary_id: { $first: '$cloudinary_id' }
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
    },
    {
      $lookup: {
        from: 'jobtitles',
        localField: 'jobTitle',
        foreignField: '_id',
        as: 'jobTitle'
      }
    },
    {
      $unwind: {
        path: '$jobTitle',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $lookup: {
        from: 'colors',
        localField: 'refferedBy.color',
        foreignField: '_id',
        as: 'refferedBy.color'
      }
    },
    {
      $unwind: {
        path: '$refferedBy.color',
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
