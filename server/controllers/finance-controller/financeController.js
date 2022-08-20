const dataAccess = require('../../data-access')
const utils = require('../../utils')
const constants = require('../../constants')
const { StatusCodes } = require('http-status-codes')

const getFinancePlanning = async (req, res) => {
  try {
    const financePlanning = await dataAccess.financePlanningDataAccess.getFinancePlanning()
    res.json(financePlanning)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const updateFinancePlanning = async (req, res) => {
  try {
    let financePlanning = await dataAccess.financePlanningDataAccess.getFinancePlanning()
    if (!financePlanning) {
      await dataAccess.financePlanningDataAccess.createFinancePlanning(req.body)
    } else {
      await dataAccess.financePlanningDataAccess.updateFinancePlanning(req.body)
    }
    res.json(req.body)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

module.exports = {
  getFinancePlanning,
  updateFinancePlanning
}
