const utils = require('../../utils')
const dataAccess = require('../../data-access')

const createActivity = async (req, res) => {
  const { body } = req
  try {
    const activity = await dataAccess.activityDataAccess.createActivity(body)
    res.send(activity)
  } catch (e) {
    res.status(500).json(utils.errorUtils.errorInstance({ message: 'Error while creating activity' }))
  }
}

const getTaskActivity = async (req, res) => {
  const { task } = req.query
  try {
    const activities = await dataAccess.activityDataAccess.getTaskActivity(task)
    res.send(activities)
  } catch (e) {
    res.status(500).json(utils.errorUtils.errorInstance({ message: 'Error while getting task activity' }))
  }
}

const getAllActivity = async (req, res) => {
  try {
    const activities = await dataAccess.activityDataAccess.getAllActivity()
    res.send(activities)
  } catch (e) {
    res.status(500).json(utils.errorUtils.errorInstance({ message: 'Error while getting all activity' }))
  }
}

const getCustomerActivity = async (req, res) => {
  const { customer, step } = req.query
  try {
    const activities = await dataAccess.activityDataAccess.getCustomerActivity({ customer, step })
    res.send(activities)
  } catch (e) {
    res.status(500).json(utils.errorUtils.errorInstance({ message: 'Error while getting customer activity' }))
  }
}

module.exports = {
  createActivity,
  getTaskActivity,
  getAllActivity,
  getCustomerActivity
}
