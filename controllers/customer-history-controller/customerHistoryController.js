const dataAccess = require('../../data-access')
const { StatusCodes } = require('http-status-codes')

const createCustomerHistory = async (req, res) => {
  try {
    const customerHistory = await dataAccess.customerHistoryDataAccess.createCustomerHistory(req.body)
    res.status(StatusCodes.CREATED).send(customerHistory)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const getCustomerHistories = async (req, res) => {
  const { customerId } = req.params

  try {
    const customerHistories = await dataAccess.customerHistoryDataAccess.getCustomerHistories(customerId)
    res.status(StatusCodes.OK).send(customerHistories)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

module.exports = {
  createCustomerHistory,
  getCustomerHistories
}
