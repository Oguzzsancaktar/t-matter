const dataAccess = require('../../data-access')
const utils = require('../../utils')
const constants = require('../../constants')
const { StatusCodes } = require('http-status-codes')
const { getCompanyPricing } = require('../company-pricing-controller/companyPricingController')
const calculateHourlyCompanyFee = require('../../helpers/calculateHourlyCompanyFee')
const { INSTALLMENT_TYPES, INSTALLMENT_STATUS } = require('../../constants/finance')
const moment = require('moment')
const { errorUtils } = require('../../utils')

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
    if (body.note) {
      const invoice = await dataAccess.financeDataAccess.getInvoiceById(params.invoiceId)
      invoice.notes.push(body.note)
      await invoice.save()
    }
    if (deposit != 0) {
      await dataAccess.financeDataAccess.createInstallment({
        type: INSTALLMENT_TYPES.DEPOSIT,
        invoice: params.invoiceId,
        payDate: new Date(),
        payAmount: deposit,
        status: INSTALLMENT_STATUS.UN_PAID
      })
    }
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

const postponeInstallment = async (req, res) => {
  const { days, oldDate, note } = req.body
  const { invoiceId, installmentId } = req.params
  try {
    if (note) {
      const installment = await dataAccess.financeDataAccess.getInstallmentById(installmentId)
      installment.notes.push(note)
      await installment.save()
    }
    await dataAccess.financeDataAccess.updateInvoiceById(invoiceId, { $inc: { postponeCount: 1 } })
    await dataAccess.financeDataAccess.updateManyInstallment({ invoice: invoiceId, payDate: { $gte: oldDate } }, [
      { $set: { payDate: { $dateAdd: { startDate: '$payDate', unit: 'day', amount: days } } } }
    ])
    res.sendStatus(StatusCodes.OK)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const payInstallment = async (req, res) => {
  const { installmentId, invoiceId } = req.params
  let { amount, paidDate, paidMethod, note } = req.body
  try {
    const installment = await dataAccess.financeDataAccess.getInstallmentById(installmentId)
    if (note) {
      installment.notes.push(note)
      await installment.save()
    }
    if (installment.type === INSTALLMENT_TYPES.DEPOSIT) {
      // if deposit greater than amount, throw error
      if (installment.payAmount > amount) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json(errorUtils.errorInstance({ message: 'Deposit amount is greater than paid amount' }))
      } else if (installment.payAmount === amount) {
        await dataAccess.financeDataAccess.updateInstallment(installmentId, {
          paidDate,
          paidMethod,
          status: INSTALLMENT_STATUS.PAID,
          paidAmount: amount
        })
      } else {
        await dataAccess.financeDataAccess.updateInstallment(installmentId, {
          paidDate,
          paidMethod,
          status: INSTALLMENT_STATUS.PAID,
          paidAmount: installment.payAmount
        })
        amount = amount - installment.payAmount
        const installments = await dataAccess.financeDataAccess.getInstallmentsByInvoiceId(invoiceId)
        let index = installments.findIndex(item => item._id.toString() === installmentId)
        while (amount > 0) {
          const i = installments[index + 1]
          const rest = i.payAmount + i.suspendedFee + i.lateFee - i.paidAmount
          if (amount >= rest) {
            await dataAccess.financeDataAccess.updateInstallment(i._id.toString(), {
              paidDate,
              paidMethod,
              paidAmount: i.payAmount,
              status: INSTALLMENT_STATUS.PAID
            })
            amount = amount - rest
          } else {
            await dataAccess.financeDataAccess.updateInstallment(i._id.toString(), {
              paidDate,
              paidMethod,
              paidAmount: amount,
              status: INSTALLMENT_STATUS.LESS_PAID
            })
            amount = 0
          }
          index = index + 1
        }
      }

      const dayDiff = moment(installment.payDate).diff(moment(paidDate), 'days')
      if (dayDiff > 0) {
        await dataAccess.financeDataAccess.updateManyInstallment(
          { invoice: invoiceId, type: INSTALLMENT_TYPES.PAYMENT },
          [{ $set: { payDate: { $dateAdd: { startDate: '$payDate', unit: 'day', amount: dayDiff } } } }]
        )
      }
      return res.sendStatus(StatusCodes.OK)
    }

    const restPay = installment.payAmount + installment.suspendedFee + installment.lateFee - installment.paidAmount
    if (restPay < amount) {
      await dataAccess.financeDataAccess.updateInstallment(installmentId, {
        paidDate,
        paidMethod,
        paidAmount: restPay + installment.paidAmount,
        status: INSTALLMENT_STATUS.PAID
      })
      const installments = await dataAccess.financeDataAccess.getInstallmentsByInvoiceId(invoiceId)
      let index = installments.findIndex(item => item._id.toString() === installmentId)
      amount = amount - restPay
      while (amount > 0) {
        const i = installments[index + 1]
        const rest = i.payAmount + i.suspendedFee + i.lateFee - i.paidAmount
        if (amount >= rest) {
          await dataAccess.financeDataAccess.updateInstallment(i._id.toString(), {
            paidDate,
            paidMethod,
            paidAmount: i.payAmount,
            status: INSTALLMENT_STATUS.PAID
          })
          amount = amount - rest
        } else {
          await dataAccess.financeDataAccess.updateInstallment(i._id.toString(), {
            paidDate,
            paidMethod,
            paidAmount: amount,
            status: INSTALLMENT_STATUS.LESS_PAID
          })
          amount = 0
        }
        index = index + 1
      }
      return res.sendStatus(StatusCodes.OK)
    }
    if (restPay > amount) {
      await dataAccess.financeDataAccess.updateInstallment(installmentId, {
        paidDate,
        paidMethod,
        paidAmount: amount,
        status: INSTALLMENT_STATUS.LESS_PAID
      })
      return res.sendStatus(StatusCodes.OK)
    }
    if (restPay === amount) {
      await dataAccess.financeDataAccess.updateInstallment(installmentId, {
        paidDate,
        paidMethod,
        paidAmount: installment.payAmount,
        status: INSTALLMENT_STATUS.PAID
      })
      return res.sendStatus(StatusCodes.OK)
    }
    res.sendStatus(StatusCodes.OK)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const resetInstallments = async (req, res) => {
  const { invoiceId } = req.params
  try {
    await dataAccess.financeDataAccess.deleteManyInstallment({ invoice: invoiceId })
    res.sendStatus(StatusCodes.OK)
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
  getInstallments,
  postponeInstallment,
  payInstallment,
  resetInstallments
}
