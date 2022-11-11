const dataAccess = require('../../data-access')
const { StatusCodes } = require('http-status-codes')
const { STATUS_TYPES } = require('../../constants/constants')
const Customer = require('../../models/customer')
const mongoose = require('mongoose')
const cloudinary = require('../../utils/upload-utils/cloudinary')

const createCustomer = async (req, res) => {
  const { body } = req

  try {
    let reliableCustomers = []

    for (let index = 0; index < body.reliableInCompany.length; index++) {
      const reliableId = body.reliableInCompany[index]._id
      const relativeType = {
        relativeTypeId: mongoose.Types.ObjectId(body.reliableInCompany[index].relativeType._id),
        fromOrTo: 0
      }

      reliableCustomers.push({ reliableId: mongoose.Types.ObjectId(reliableId), relativeType })
    }

    for (let index = 0; index < body.createContact.length; index++) {
      delete body.createContact[index]._id
      const contact = await Customer.create(body.createContact[index])
      reliableCustomers.push({
        reliableId: mongoose.Types.ObjectId(contact._id),
        relativeType: {
          fromOrTo: 0,
          relativeTypeId: mongoose.Types.ObjectId(body.createContact[index].relativeType._id)
        }
      })
    }

    body.reliableCustomers = reliableCustomers
    const createdCustomer = await dataAccess.customerDataAccess.createCustomer(body)

    for (let index = 0; index < body.reliableCustomers.length; index++) {
      const customerId = body.reliableCustomers[index].reliableId
      const relativeTypeId = body.reliableCustomers[index].relativeType.relativeTypeId
      await dataAccess.customerDataAccess.findByIdAndUpdateCustomerForCreate(customerId, {
        $push: {
          reliableCustomers: {
            reliableId: mongoose.Types.ObjectId(createdCustomer._id),
            relativeType: {
              relativeTypeId: mongoose.Types.ObjectId(relativeTypeId),
              fromOrTo: 1
            }
          }
        }
      })
    }
    res.status(StatusCodes.CREATED).json(createdCustomer)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const updateCustomer = async (req, res) => {
  const { _id, ...data } = req.body
  try {
    const updatedUser = await dataAccess.customerDataAccess.findByIdAndUpdateCustomer(_id ? _id : req.params.id, data)
    res.sendStatus(StatusCodes.OK).json(updatedUser)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const getCustomer = async (req, res) => {
  const { id } = req.params
  try {
    const customer = await dataAccess.customerDataAccess.findCustomerById(id, 'refferedBy')
    res.status(StatusCodes.OK).json(customer)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const removeCustomer = async (req, res) => {
  const { id } = req.params
  try {
    await dataAccess.customerDataAccess.findByIdAndUpdateCustomer(id, { status: STATUS_TYPES.INACTIVE })
    res.sendStatus(StatusCodes.OK)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const getCustomers = async (req, res) => {
  const { search, size, status } = req.query
  try {
    const customers = await dataAccess.customerDataAccess.findCustomerWithFiltersAndPopulate({ search, size, status })
    res.status(StatusCodes.OK).json(customers)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const getCustomerReliablesWithId = async (req, res) => {
  const { id } = req.params
  let reliableCustomerArr = []

  try {
    const customer = await dataAccess.customerDataAccess.findCustomerById(id)
    if (customer) {
      for (let i = 0; i < customer.reliableCustomers.length; i++) {
        const reliableCustomer = await dataAccess.customerDataAccess.findCustomerById(
          customer.reliableCustomers[i].reliableId,
          'refferedBy'
        )
        reliableCustomerArr.push(reliableCustomer)
      }
    }

    res.status(StatusCodes.OK).json(reliableCustomerArr)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const addOrChangeCustomerProfileImage = async (req, res) => {
  const { id } = req.params
  try {
    const customer = await Customer.findById(id)
    var result

    if (customer) {
      if (req.body.file) {
        result = await cloudinary.uploader.upload(req.body.file)
      } else {
        result = await cloudinary.uploader.upload(req.file.path)
      }

      customer.cloudinary_id = result.public_id
      customer.profile_img = result.secure_url

      const updatedCustomer = await dataAccess.customerDataAccess.findByIdAndUpdateCustomerForCreate(id, customer)

      res.status(200).send(updatedCustomer)
    } else {
      res.status(404).send('Customer not found!!')
    }
  } catch (err) {
    console.log(err)
  }
}

const checkInCreateContactAndRelateNewConsultationTask = async (req, res) => {
  const { body } = req
  try {
    await dataAccess.customerDataAccess.createCustomer(body)
    res.sendStatus(StatusCodes.OK)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

module.exports = {
  createCustomer,
  getCustomers,
  removeCustomer,
  getCustomer,
  updateCustomer,
  getCustomerReliablesWithId,
  addOrChangeCustomerProfileImage,
  checkInCreateContactAndRelateNewConsultationTask
}
