const dataAccess = require('../../data-access')
const utils = require('../../utils')
const constants = require('../../constants')
const { StatusCodes } = require('http-status-codes')
const { getCompanyPricing } = require('../company-pricing-controller/companyPricingController')
const calculateHourlyCompanyFee = require('../../helpers/calculateHourlyCompanyFee')
const { INSTALLMENT_TYPES, INSTALLMENT_STATUS } = require('../../constants/finance')
const moment = require('moment')

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
    for (const item of req.body.expiredTaskSteps) {
      await dataAccess.financeDataAccess.updateExpiredTaskStepById(item, { isInvoiced: true })
    }
    res.json(invoice)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const createExpiredTaskStep = async (req, res) => {
  try {
    const { hourlyCompanyFee } = await calculateHourlyCompanyFee()
    req.body.expiredTimePrice = hourlyCompanyFee * (req.body.expiredTime / 3600)
    const expiredTaskStep = await dataAccess.financeDataAccess.createExpiredTaskStep(req.body)
    res.json(expiredTaskStep)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const getExpiredTaskSteps = async (req, res) => {
  try {
    const expiredTaskSteps = await dataAccess.financeDataAccess.getExpiredTaskStepsByCustomerId({
      customerId: req.params.customerId,
      isInvoiced: req.query.isInvoiced
    })
    res.json(expiredTaskSteps)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const createInstallment = async (req, res) => {
  const { body, params } = req
  try {
    const { startDate, deposit, quantity, payAmount } = body
    await dataAccess.financeDataAccess.createInstallment({
      type: INSTALLMENT_TYPES.DEPOSIT,
      invoice: params.invoiceId,
      payDate: new Date(),
      payAmount: deposit,
      status: INSTALLMENT_STATUS.UN_PAID
    })
    for (let i = 0; i < quantity; i++) {
      const installment = {
        type: INSTALLMENT_TYPES.PAYMENT,
        invoice: params.invoiceId,
        payDate: moment(startDate).add(i, 'months').toDate(),
        payAmount,
        status: INSTALLMENT_STATUS.UN_PAID
      }
      await dataAccess.financeDataAccess.createInstallment(installment)
    }
    res.sendStatus(StatusCodes.OK)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const getInstallments = async (req, res) => {
  try {
    const installments = await dataAccess.financeDataAccess.getInstallmentsByInvoiceId(req.params.invoiceId)
    res.json(installments)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

module.exports = {
  getFinancePlanning,
  updateFinancePlanning,
  getInvoices,
  createInvoice,
  createExpiredTaskStep,
  getExpiredTaskSteps,
  createInstallment,
  getInstallments
}
