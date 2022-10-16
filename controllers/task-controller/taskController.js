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
      steps: body.steps.map(step => {
        return {
          ...step,
          workedTimes: step.workedTimes.map(work => {
            return {
              user: mongoose.Types.ObjectId(step.category._id),
              time: work.time
            }
          }),
          category: mongoose.Types.ObjectId(step.category._id),
          location: mongoose.Types.ObjectId(step.location._id),
          responsibleUser: mongoose.Types.ObjectId(step.responsibleUser._id),
          addedFrom: step.responsibleUser._id ? mongoose.Types.ObjectId(req.user.userId) : null,
          startDate: step.startDate,
          totalPassedTime: step.totalPassedTime
        }
      }),
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

    // TODO aggregate here !
    // TODO aggregate here !
    const tempTask = { ...task }
    for (let index = 0; index < task.steps.length; index++) {
      let tempworkedTimes = []
      const step = task.steps[index]

      for (let k = 0; k < step.workedTimes.length; k++) {
        const work = step.workedTimes[k]

        let populated = {
          ...work,
          user: await dataAccess.userDataAccess.findUserById(work.user, 'role')
        }

        tempworkedTimes.push(populated)
      }

      tempTask.steps[index].workedTimes = tempworkedTimes
    }
    // TODO aggregate here !
    // TODO aggregate here !

    res.status(200).json(tempTask)
  } catch (error) {
    console.log(error)
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
    body.steps = body.steps.map(({ responsibleUser, location, category, workedTimes, ...rest }) => {
      console.log('workedTimesworkedTimesworkedTimes', workedTimes)
      return {
        ...rest,
        workedTimes: workedTimes.map(work => {
          return {
            user: mongoose.Types.ObjectId(work.user),
            time: work.time
          }
        }),
        responsibleUser: mongoose.Types.ObjectId(responsibleUser),
        location: mongoose.Types.ObjectId(location),
        category: mongoose.Types.ObjectId(category)
      }
    })
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

const getTaskSteps = async (req, res) => {
  try {
    const { startDate, endDate } = req.query
    const steps = await dataAccess.taskDataAccess.getTaskStepsData({
      responsibleUserId: req.user.userId,
      startDate,
      endDate
    })
    res.status(StatusCodes.OK).json(steps)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const transferTasks = async (req, res) => {
  const { body } = req
  try {
    for (const task of body.tasks) {
      if (task.toUserId === 'ALL' || !task.toUserId) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json(utils.errorUtils.errorInstance({ message: 'Please select a user to transfer' }))
      }
      if (!task.taskId) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json(utils.errorUtils.errorInstance({ message: 'Please select a task to transfer' }))
      }
      const x = await Task.findById(task.taskId).lean()
      x.steps[task.stepIndex].responsibleUser = mongoose.Types.ObjectId(task.toUserId)
      await dataAccess.taskDataAccess.updateTaskById(task.taskId, x)
    }
    res.sendStatus(200)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(utils.errorUtils.errorInstance({ message: error.message }))
  }
}

const updateTaskStepsSeen = async (req, res) => {
  const { tasks } = req.body
  try {
    const xs = []
    for (const task of tasks) {
      const x = await Task.findById(task.taskId).lean()
      xs.push(x)
      if (!x.steps[task.stepIndex].seen) {
        x.steps[task.stepIndex].seen = {
          [task.name]: true
        }
      } else {
        x.steps[task.stepIndex].seen[task.name] = true
      }
      await dataAccess.taskDataAccess.updateTaskById(task.taskId, x)
    }
    res.status(200).send(xs)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(utils.errorUtils.errorInstance({ message: error.message }))
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
  getTaskStepMonthlyAnalysis,
  getTaskSteps,
  transferTasks,
  updateTaskStepsSeen
}
