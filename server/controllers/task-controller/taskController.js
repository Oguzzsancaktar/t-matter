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
      customer: customerId
    }
    await dataAccess.taskDataAccess.createTask(task)
    res.status(201).json({ message: 'Task created' })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(utils.errorUtils.errorInstance({ message: error.message }))
  }
}

const getTasks = async (req, res) => {
  const { customerId } = req.params
  try {
    const tasks = await dataAccess.taskDataAccess.getCustomerTasks(customerId)
    res.status(200).json(tasks)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(utils.errorUtils.errorInstance({ message: error.message }))
  }
}

const getTask = async (req, res) => {
  const { taskId } = req.params
  try {
<<<<<<< HEAD
    const task = await Task.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(taskId)
        }
      },
      ...taskPopulatePipe
    ])

    res.status(200).json(task[0])
=======
    const task = await dataAccess.taskDataAccess.getTaskById(taskId)
    res.status(200).json(task)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(utils.errorUtils.errorInstance({ message: error.message }))
  }
}

const updateTask = async (req, res) => {
  const { taskId } = req.params
  const { body } = req
  try {
    const task = await dataAccess.taskDataAccess.updateTaskById(taskId, body)
    res.status(200).json(task)
>>>>>>> 97318631a037808dd2e67299d7f62f3dabc342ea
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(utils.errorUtils.errorInstance({ message: error.message }))
  }
}

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask
}
