const dataAccess = require('../../data-access')
const { StatusCodes } = require('http-status-codes')

const createCustomerWorkActivity = async (req, res) => {
  try {
    const customerWorkActivity = await dataAccess.customerWorkActivityDataAccess.createCustomerWorkActivity(req.body)
    res.status(StatusCodes.CREATED).send(customerWorkActivity)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const getCustomerWorkActivities = async (req, res) => {
  const { customerId } = req.params

  try {
    const customerWorkActivities = await dataAccess.customerWorkActivityDataAccess.getCustomerWorkActivities(customerId)
    res.status(StatusCodes.OK).send(customerWorkActivities)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

module.exports = {
  createCustomerWorkActivity,
  getCustomerWorkActivities
}
