const utils = require('../../utils')
const { StatusCodes } = require('http-status-codes')
const mongoose = require('mongoose')
const dataAccess = require('../../data-access')
const Task = require('../../models/task')

const createTask = async (req, res) => {
  const { body } = req
  const { customerId } = req.params
  try {
    const task = {
      workflowId: body.workflowId,
      startDate: body.startDate,
      name: body.name,
      steps: body.steps.map(step => ({
        ...step,
        category: mongoose.Types.ObjectId(step.category._id),
        location: mongoose.Types.ObjectId(step.location._id),
        responsibleUser: mongoose.Types.ObjectId(step.responsibleUser._id),
        startDate: step.startDate
      })),
      customer: customerId,
      totalDuration: body.totalDuration,
      totalPrice: body.totalPrice,
      status: body.status
    }
    await dataAccess.taskDataAccess.createTask(task)
    res.status(201).json({ message: 'Task created' })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(utils.errorUtils.errorInstance({ message: error.message }))
  }
}

const getAllTaskList = async (req, res) => {
  const { categoryId, userId, status } = req.query
  try {
    const tasks = await dataAccess.taskDataAccess.getCustomerTasks({ categoryId, userId, status })
    res.status(200).json(tasks)
  } catch (error) {
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(utils.errorUtils.errorInstance({ message: error.message }))
  }
}

const removeTask = async (req, res) => {
  const { taskId } = req.params
  try {
    const deletedTask = await dataAccess.taskDataAccess.deleteTaskById(taskId)
    res.status(200).json(deletedTask)
  } catch (error) {
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(utils.errorUtils.errorInstance({ message: error.message }))
  }
}

const getTasks = async (req, res) => {
  const { customerId } = req.params
  const { isInvoiced, search, size, status } = req.query
  try {
    const tasks = await dataAccess.taskDataAccess.getCustomerTasks({ customerId, isInvoiced, search, size, status })
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

const postponeTask = async (req, res) => {
  const { taskId, postponeDate, step } = req.body

  try {
    const task = await Task.findById(taskId)
    if (task) {
      const steps = [...task.steps]
      steps[step].usedPostpone = (+steps[step].usedPostpone + 1).toString()
      steps[step].postponedDate = postponeDate

      const tempTask = {
        ...task,
        steps
      }
      const updatedTask = await dataAccess.taskDataAccess.updateTaskById(taskId, tempTask)
      console.log(updatedTask)
      res.status(200).json(updatedTask)
    }
    res.status(404).json('TASK not found')
  } catch (error) {
    console.log(error)
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

const usedTaskWorkflowCounts = async (req, res) => {
  try {
    const data = await dataAccess.taskDataAccess.getUsedTaskWorkflowCounts()
    res.status(200).json(data)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(utils.errorUtils.errorInstance({ message: error.message }))
  }
}

const getTaskCountForMonths = async (req, res) => {
  try {
    const workflowPlans = await dataAccess.taskDataAccess.getTaskCountForMonthsData()
    res.status(StatusCodes.OK).json(workflowPlans)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const getTaskStepMonthlyAnalysis = async (req, res) => {
  try {
    const steps = await dataAccess.taskDataAccess.getTaskStepMonthlyAnalysisData({ responsibleUserId: req.user.userId })
    res.status(StatusCodes.OK).json(steps)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  reorderTasks,
  getAllTaskList,
  postponeTask,
  removeTask,
  usedTaskWorkflowCounts,
  getTaskCountForMonths,
  getTaskStepMonthlyAnalysis
}
