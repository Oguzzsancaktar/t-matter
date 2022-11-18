const dataAccess = require('../../data-access')
const { HR_TASK_TYPES } = require('../../constants/hrConstants')

const getHrTasks = async (req, res) => {
  const { userId } = req.params
  const { type } = req.query
  try {
    const hrTasks = await dataAccess.hrTaskDataAccess.hrTaskFind({
      owner: userId,
      type
    })
    res.status(200).json(hrTasks)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getHrTasks
}
