const utils = require('../../utils')
const { StatusCodes } = require('http-status-codes')
const mongoose = require('mongoose')
const dataAccess = require('../../data-access')

const createTask = async (req, res) => {
  const { body } = req
  const { customerId } = req.params
  try {
    const task = {
      startDate: new Date(),
      name: body.name,
      steps: body.steps.map(step => ({
        ...step,
        category: mongoose.Types.ObjectId(step.category._id),
        location: mongoose.Types.ObjectId(step.location._id),
        responsibleUser: mongoose.Types.ObjectId(step.responsibleUser._id),
        startDate: new Date()
      })),
      customer: customerId,
      totalPrice: body.totalPrice
    }
    await dataAccess.taskDataAccess.createTask(task)
    res.status(201).json({ message: 'Task created' })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(utils.errorUtils.errorInstance({ message: error.message }))
  }
}

const getTasks = async (req, res) => {
  const { customerId } = req.params
  const { isInvoiced } = req.query
  try {
    const tasks = await dataAccess.taskDataAccess.getCustomerTasks({ customerId, isInvoiced })
    res.status(200).json(tasks)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(utils.errorUtils.errorInstance({ message: error.message }))
  }
}

const getTask = async (req, res) => {
  const { taskId } = req.params
  try {
    const [task] = await dataAccess.taskDataAccess.getTaskById(taskId)
    res.status(200).json(task)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(utils.errorUtils.errorInstance({ message: error.message }))
  }
}

const updateTask = async (req, res) => {
  const { taskId } = req.params
  const { body } = req
  try {
    body.steps = body.steps.map(({ responsibleUser, location, category, ...rest }) => ({
      ...rest,
      responsibleUser: mongoose.Types.ObjectId(responsibleUser),
      location: mongoose.Types.ObjectId(location),
      category: mongoose.Types.ObjectId(category)
    }))
    const task = await dataAccess.taskDataAccess.updateTaskById(taskId, body)
    res.status(200).json(task)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(utils.errorUtils.errorInstance({ message: error.message }))
  }
}

const reorderTasks = async (req, res) => {
  const { body } = req
  try {
    for (const task of body) {
      await dataAccess.taskDataAccess.updateTaskById(task._id, { index: task.index })
    }
    res.status(200)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(utils.errorUtils.errorInstance({ message: error.message }))
  }
}

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  reorderTasks
}
