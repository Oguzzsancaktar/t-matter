const dataAccess = require('../../data-access')
const utils = require('../../utils')
const constants = require('../../constants')
const { StatusCodes } = require('http-status-codes')

const getFinancePlanning = async (req, res) => {
  try {
    const financePlanning = await dataAccess.financeDataAccess.getFinancePlanning()
    res.json(financePlanning)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const updateFinancePlanning = async (req, res) => {
  try {
    let financePlanning = await dataAccess.financeDataAccess.getFinancePlanning()
    if (!financePlanning) {
      await dataAccess.financeDataAccess.createFinancePlanning(req.body)
    } else {
      await dataAccess.financeDataAccess.updateFinancePlanning(req.body)
    }
    res.json(req.body)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const getInvoices = async (req, res) => {
  try {
    const invoices = await dataAccess.financeDataAccess.getInvoicesByCustomerId(req.params.customerId)
    res.json(invoices)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const createInvoice = async (req, res) => {
  try {
    const invoice = await dataAccess.financeDataAccess.createInvoice(req.body)
    for (const item of req.body.tasks) {
      await dataAccess.taskDataAccess.updateTaskById(item, { isInvoiced: true })
    }
    res.json(invoice)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

module.exports = {
  getFinancePlanning,
  updateFinancePlanning,
  getInvoices,
  createInvoice
}
