const utils = require('../../utils')
const dataAccess = require('../../data-access')

const createActivity = async (req, res) => {
  const { body } = req
  try {
    const activity = await dataAccess.activityDataAccess.createActivity(body)
    res.send(activity)
  } catch (e) {
    console.log(e)
    res.status(500).json(utils.errorUtils.errorInstance({ message: 'Error while creating activity' }))
  }
}

const updateActivity = async (req, res) => {
  const { body } = req
  const { activityId } = req.params

  console.log('activityId', activityId)
  try {
    const updatedActivity = await dataAccess.activityDataAccess.updateActivity(body)
    res.send(updatedActivity)
  } catch (e) {
    console.log(e)
    res.status(500).json(utils.errorUtils.errorInstance({ message: 'Error while creating activity' }))
  }
}

const getTaskActivity = async (req, res) => {
  const { task, step, userId } = req.query
  try {
    const activities = await dataAccess.activityDataAccess.getTaskActivity({ task, step, userId })

    res.send(activities)
  } catch (e) {
    console.log(e)
    res.status(500).json(utils.errorUtils.errorInstance({ message: 'Error while getting task activity' }))
  }
}

const getAllActivity = async (req, res) => {
  const { userId, customerId, categoryId } = req.query
  try {
    const activities = await dataAccess.activityDataAccess.getAllActivity(userId, customerId, categoryId)
    res.send(activities)
  } catch (e) {
    console.log(e)
    res.status(500).json(utils.errorUtils.errorInstance({ message: 'Error while getting all activity' }))
  }
}

const getCustomerActivity = async (req, res) => {
  const { customer } = req.query
  try {
    const activities = await dataAccess.activityDataAccess.getCustomerActivity({ customer })
    res.send(activities)
  } catch (e) {
    console.log(e)
    res.status(500).json(utils.errorUtils.errorInstance({ message: 'Error while getting customer activity' }))
  }
}

const getCustomerActivityCategoryCounts = async (req, res) => {
  const { categoryId, customerId, userId } = req.query

  try {
    const activityCategoryCounts = await dataAccess.activityDataAccess.getActivityCategoryCounts(
      categoryId,
      customerId,
      userId
    )
    res.send(activityCategoryCounts)
  } catch (e) {
    console.log(e)
    res
      .status(500)
      .json(utils.errorUtils.errorInstance({ message: 'Error while getting customer activity category counts' }))
  }
}

module.exports = {
  createActivity,
  updateActivity,
  getTaskActivity,
  getAllActivity,
  getCustomerActivity,
  getCustomerActivityCategoryCounts
}
