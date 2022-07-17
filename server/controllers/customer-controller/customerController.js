const dataAccess = require('../../data-access')
const { StatusCodes } = require('http-status-codes')
const { STATUS_TYPES } = require('../../constants/constants')
const utils = require('../../utils')
const Customer = require('../../models/customer')

const createCustomer = async (req, res) => {
  const { body } = req
  try {
    let reliableCustomers = []

    for (let index = 0; index < body.reliableInCompany.length; index++) {
      const reliableId = body.reliableInCompany[index]._id
      reliableCustomers.push(reliableId)
    }

    for (let index = 0; index < body.createContact.length; index++) {
      const contact = await Customer.create(body.createContact[index])
      reliableCustomers.push(contact._id)
    }

    body.reliableCustomers = reliableCustomers
    await dataAccess.customerDataAccess.createCustomer(body)
    res.sendStatus(StatusCodes.CREATED)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const updateCustomer = async (req, res) => {
  const { _id, ...data } = req.body
  try {
    await dataAccess.customerDataAccess.findByIdAndUpdateCustomer(_id ? _id : req.params.id, data)
    res.sendStatus(StatusCodes.OK)
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
          customer.reliableCustomers[i],
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

module.exports = {
  createCustomer,
  getCustomers,
  removeCustomer,
  getCustomer,
  updateCustomer,
  getCustomerReliablesWithId
}
