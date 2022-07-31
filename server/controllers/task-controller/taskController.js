const Task = require('../../models/task')
const utils = require('../../utils')
const { StatusCodes } = require('http-status-codes')
const mongoose = require('mongoose')

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
    await Task.create(task)
    res.status(201).json({ message: 'Task created' })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(utils.errorUtils.errorInstance({ message: error.message }))
  }
}

const taskPopulatePipe = [
  {
    $unwind: '$steps'
  },
  {
    $lookup: {
      from: 'workflowcategories',
      localField: 'steps.category',
      foreignField: '_id',
      as: 'steps.category'
    }
  },
  {
    $unwind: '$steps.category'
  },
  {
    $lookup: {
      from: 'users',
      localField: 'steps.responsibleUser',
      foreignField: '_id',
      as: 'steps.responsibleUser'
    }
  },
  {
    $unwind: '$steps.responsibleUser'
  },
  {
    $lookup: {
      from: 'locations',
      localField: 'steps.location',
      foreignField: '_id',
      as: 'steps.location'
    }
  },
  {
    $unwind: '$steps.location'
  },
  {
    $lookup: {
      from: 'customers',
      localField: 'customer',
      foreignField: '_id',
      as: 'customer'
    }
  },
  {
    $unwind: '$customer'
  },
  {
    $group: {
      _id: '$_id',
      steps: { $push: '$steps' },
      name: { $first: '$name' },
      __v: { $first: '$__v' },
      customer: { $first: '$customer' },
      startDate: { $first: '$startDate' }
    }
  }
]

const getTasks = async (req, res) => {
  const { customerId } = req.params
  try {
    const tasks = await Task.aggregate([
      {
        $match: {
          customer: mongoose.Types.ObjectId(customerId)
        }
      },
      ...taskPopulatePipe
    ])

    res.status(200).json(tasks)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(utils.errorUtils.errorInstance({ message: error.message }))
  }
}

// get task by id
const getTask = async (req, res) => {
  const { taskId } = req.params
  try {
    const task = await Task.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(taskId)
        }
      },
      ...taskPopulatePipe
    ])
    res.status(200).json(task)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(utils.errorUtils.errorInstance({ message: error.message }))
  }
}

const updateTask = async (req, res) => {
  const { taskId } = req.params
  const { body } = req
  try {
    const task = await Task.findByIdAndUpdate(taskId, body, { new: true })
    res.status(200).json(task)
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
