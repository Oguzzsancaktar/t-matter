const dataAccess = require('../../data-access')
const { StatusCodes } = require('http-status-codes')
const { STATUS_TYPES } = require('../../constants/constants')
const utils = require('../../utils')

const createCustomer = async (req, res) => {
  const { body } = req
  try {
    body.password = await utils.authUtils.hashPassword({ plainTextPassword: body.password })
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
    const customer = await dataAccess.customerDataAccess.findCustomerById(id, 'role')
    let workingSchedule = await dataAccess.workingScheduleDataAccess.findWorkingScheduleByCustomerId(id)
    if (!workingSchedule) {
      workingSchedule = await dataAccess.workingScheduleDataAccess.findCompanyWorkingSchedule()
    }
    res.status(StatusCodes.OK).json({ ...customer, workingSchedule })
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

module.exports = {
  createCustomer,
  getCustomers,
  removeCustomer,
  getCustomer,
  updateCustomer
}
