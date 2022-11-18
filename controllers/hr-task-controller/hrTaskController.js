const dataAccess = require('../../data-access')

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
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getHrTasks
}
