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

const getWorkflowCategoryById = async (req, res) => {
  const { id } = req.params
  try {
    const category = await dataAccess.workflowDataAccess.findWorkflowCategoryById(id, '')
    res.status(StatusCodes.OK).json(category)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const updateCategory = async (req, res) => {
  const { _id, ...data } = req.body
  try {
    await dataAccess.workflowDataAccess.findByIdAndUpdateWorkflowCategory(_id ? _id : req.params.id, data)
    res.sendStatus(StatusCodes.OK)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const removeCategory = async (req, res) => {
  const { id } = req.params
  try {
    await dataAccess.workflowDataAccess.findByIdAndUpdateWorkflowCategory(id, { status: STATUS_TYPES.INACTIVE })
    res.sendStatus(StatusCodes.OK)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

// Checklist
const createWorkflowChecklist = async (req, res) => {
  const { body } = req
  try {
    await dataAccess.workflowDataAccess.createWorkflowChecklist(body)
    res.sendStatus(StatusCodes.CREATED)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const getWorkflowChecklists = async (req, res) => {
  try {
    const checklists = await dataAccess.workflowDataAccess.getWorkflowChecklists({}, '')
    res.status(StatusCodes.OK).json(checklists)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

module.exports = {
  createWorkflowCategory,
  getWorkflowCategories,
  getWorkflowCategoryById,
  updateCategory,
  removeCategory,

  createWorkflowChecklist,
  getWorkflowChecklists
}
