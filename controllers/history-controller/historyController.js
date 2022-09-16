const dataAccess = require('../../data-access')

const getFinanceHistoryController = async (req, res) => {
  try {
    const history = await dataAccess.historyDataAccess.getCustomerFinanceHistory(req.body)
    res.status(200).json(history)
  } catch (error) {
    res.status(500).send(error)
  }
}

const createHistoryController = async (req, res) => {
  try {
    const history = await dataAccess.historyDataAccess.createHistory({ ...req.body, user: req.user.userId })
    res.status(200).json(history)
  } catch (error) {
    res.status(500).send(error)
  }
}

module.exports = {
  getFinanceHistoryController,
  createHistoryController
}
