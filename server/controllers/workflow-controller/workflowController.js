const dataAccess = require('../../data-access')
const { StatusCodes } = require('http-status-codes')
const { STATUS_TYPES } = require('../../constants/constants')

const createWorkflowCategory = async (req, res) => {
  const { body } = req
  try {
    await dataAccess.workflowDataAccess.createWorkflowCategory(body)
    res.sendStatus(StatusCodes.CREATED)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const getWorkflowCategories = async (req, res) => {
  try {
    const categories = await dataAccess.workflowDataAccess.getWorkflowCategories({}, '')
    res.status(StatusCodes.OK).json(categories)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

module.exports = {
  createWorkflowCategory,
  getWorkflowCategories
}
