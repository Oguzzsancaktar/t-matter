const Task = require('../../models/task')
const utils = require('../../utils')
const {StatusCodes} = require("http-status-codes");

const createTask = async (req, res) => {
  const { body } = req
  const { customerId } = req.params
  try {
    const task = {
      startDate: new Date(),
      name: body.name,
      steps: body.steps.map(step => ({
        ...step,
        category: step.category._id,
        location: step.location._id,
        responsibleUser: step.responsibleUser._id,
        startDate: new Date(),
      })),
      customer: customerId
    }
    await Task.create(task)
    res.status(201).json({ message: 'Task created' })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(utils.errorUtils.errorInstance({ message: error.message }))
  }
}

const getTasks = async (req, res) => {
  const { customerId } = req.params
  try {
    const tasks = await Task.find({ customer: customerId })
    res.status(200).json(tasks)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(utils.errorUtils.errorInstance({ message: error.message }))
  }
}

module.exports = {
  createTask,
  getTasks
}
