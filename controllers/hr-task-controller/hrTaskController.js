const dataAccess = require('../../data-access')
const utils = require('../../utils')

const getHrTasks = async (req, res) => {
  const { userId } = req.params
  const { type } = req.query
  try {
    const query = {
      owner: userId
    }
    if (type) {
      query.type = type
    }
    const hrTasks = await dataAccess.hrTaskDataAccess.hrTaskFind(query)
    res.status(200).json(hrTasks)
  } catch (error) {
    console.log(error)
    res.status(500).json(utils.errorUtils.errorInstance({ message: e.message }))
  }
}

const updateHrTask = async (req, res) => {
  const { id } = req.params
  const { body } = req
  try {
    const hrTask = await dataAccess.hrTaskDataAccess.hrTaskFindByIdAndUpdate(id, body)
    res.status(200).json(hrTask)
  } catch (e) {
    console.log(e)
    res.status(500).json(utils.errorUtils.errorInstance({ message: e.message }))
  }
}

module.exports = {
  getHrTasks,
  updateHrTask
}
