const dataAccess = require('../../data-access')
const utils = require('../../utils')
const constants = require('../../constants')
const { StatusCodes } = require('http-status-codes')
const { getCompanyPricing } = require('../company-pricing-controller/companyPricingController')
const calculateHourlyCompanyFee = require('../../helpers/calculateHourlyCompanyFee')
const { INSTALLMENT_TYPES, INSTALLMENT_STATUS } = require('../../constants/finance')
const moment = require('moment')
const { errorUtils } = require('../../utils')
const { HISTORY_TYPES } = require('../../constants/historyConstants')

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
    await dataAccess.historyDataAccess.createHistory({
      type: HISTORY_TYPES.CREATED,
      title: `Invoice Created`,
      description: `Invoice: $${Math.ceil(invoice.total)} has been created`,
      invoice: invoice._id,
      customer: invoice.customer,
      user: req.user.userId
    })
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
    await dataAccess.historyDataAccess.createHistory({
      type: HISTORY_TYPES.CREATED,
      title: 'Extra Time Created',
      description: `Exp Task Price: $${Math.ceil(expiredTaskStep.expiredTimePrice)} has been created`,
      customer: expiredTaskStep.customer,
      user: req.user.userId
    })
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
    const invoice = await dataAccess.financeDataAccess.getInvoiceById(params.invoiceId)
    await dataAccess.historyDataAccess.createHistory({
      type: HISTORY_TYPES.CREATED,
      title: 'Installment Plan Created',
      description: body.note ? body.note : `Installment Plan has been created`,
      invoice: params.invoiceId,
      customer: invoice.customer,
      user: req.user.userId
    })
    if (body.note) {
      invoice.notes.push(body.note)
      await invoice.save()
    }
    if (deposit != 0) {
      const installment = await dataAccess.financeDataAccess.createInstallment({
        type: INSTALLMENT_TYPES.DEPOSIT,
        invoice: params.invoiceId,
        payDate: new Date(),
        payAmount: deposit,
        status: INSTALLMENT_STATUS.UN_PAID
      })
      await dataAccess.historyDataAccess.createHistory({
        type: HISTORY_TYPES.CREATED,
        title: 'Installment Created(deposit)',
        description: `Deposit: $${deposit} has been created`,
        invoice: params.invoiceId,
        customer: invoice.customer,
        installment: installment._id,
        user: req.user.userId
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
      const newInstallment = await dataAccess.financeDataAccess.createInstallment(installment)
      await dataAccess.historyDataAccess.createHistory({
        type: HISTORY_TYPES.CREATED,
        title: 'Installment Created(payment)',
        description: `Payment: $${payAmount} has been created`,
        invoice: params.invoiceId,
        customer: invoice.customer,
        installment: newInstallment._id,
        user: req.user.userId
      })
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
    const invoice = await dataAccess.financeDataAccess.getInvoiceById(invoiceId)
    if (note) {
      const installment = await dataAccess.financeDataAccess.getInstallmentById(installmentId)
      installment.notes.push(note)
      await installment.save()
    }
    await dataAccess.financeDataAccess.updateInvoiceById(invoiceId, { $inc: { postponeCount: 1 } })
    await dataAccess.financeDataAccess.updateManyInstallment({ invoice: invoiceId, payDate: { $gte: oldDate } }, [
      { $set: { payDate: { $dateAdd: { startDate: '$payDate', unit: 'day', amount: days } } } }
    ])
    await dataAccess.historyDataAccess.createHistory({
      type: HISTORY_TYPES.UPDATED,
      title: `Installment Postponed${days}`,
      description: note ? note : 'Installment Plan Postponed',
      invoice: invoiceId,
      customer: invoice.customer,
      installment: installmentId,
      user: req.user.userId
    })
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
    const invoice = await dataAccess.financeDataAccess.getInvoiceById(invoiceId)
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
        const ins = await dataAccess.financeDataAccess.updateInstallment(installmentId, {
          paidDate,
          paidMethod,
          status: INSTALLMENT_STATUS.PAID,
          paidAmount: amount
        })
        await dataAccess.historyDataAccess.createHistory({
          type: HISTORY_TYPES.UPDATED,
          title: `Installment Paid $${amount}`,
          description: note ? note : 'paid',
          invoice: invoiceId,
          customer: invoice.customer,
          installment: ins._id,
          user: req.user.userId
        })
      } else {
        const ins = await dataAccess.financeDataAccess.updateInstallment(installmentId, {
          paidDate,
          paidMethod,
          status: INSTALLMENT_STATUS.PAID,
          paidAmount: installment.payAmount
        })
        await dataAccess.historyDataAccess.createHistory({
          type: HISTORY_TYPES.UPDATED,
          title: `Installment Paid $${installment.payAmount}`,
          description: note ? note : 'paid',
          invoice: invoiceId,
          customer: invoice.customer,
          installment: ins._id,
          user: req.user.userId
        })
        amount = amount - installment.payAmount
        const installments = await dataAccess.financeDataAccess.getInstallmentsByInvoiceId(invoiceId)
        let index = installments.findIndex(item => item._id.toString() === installmentId)
        while (amount > 0) {
          const i = installments[index + 1]
          const rest = i.payAmount + i.suspendedFee + i.lateFee - i.paidAmount
          if (amount >= rest) {
            const ins = await dataAccess.financeDataAccess.updateInstallment(i._id.toString(), {
              paidDate,
              paidMethod,
              paidAmount: i.payAmount,
              status: INSTALLMENT_STATUS.PAID
            })
            await dataAccess.historyDataAccess.createHistory({
              type: HISTORY_TYPES.UPDATED,
              title: `Installment Paid $${i.payAmount}`,
              description: note ? note : 'paid',
              invoice: invoiceId,
              customer: invoice.customer,
              installment: ins._id,
              user: req.user.userId
            })
            amount = amount - rest
          } else {
            const ins = await dataAccess.financeDataAccess.updateInstallment(i._id.toString(), {
              paidDate,
              paidMethod,
              paidAmount: amount,
              status: INSTALLMENT_STATUS.LESS_PAID
            })
            await dataAccess.historyDataAccess.createHistory({
              type: HISTORY_TYPES.UPDATED,
              title: `Installment Paid $${amount}`,
              description: note ? note : 'Less Paid',
              invoice: invoiceId,
              customer: invoice.customer,
              installment: ins._id,
              user: req.user.userId
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
      const inst = await dataAccess.financeDataAccess.updateInstallment(installmentId, {
        paidDate,
        paidMethod,
        paidAmount: restPay + installment.paidAmount,
        status: INSTALLMENT_STATUS.PAID
      })
      await dataAccess.historyDataAccess.createHistory({
        type: HISTORY_TYPES.UPDATED,
        title: `Installment Paid $${restPay + installment.paidAmount}`,
        description: note ? note : 'paid',
        invoice: invoiceId,
        customer: invoice.customer,
        installment: inst._id,
        user: req.user.userId
      })
      const installments = await dataAccess.financeDataAccess.getInstallmentsByInvoiceId(invoiceId)
      let index = installments.findIndex(item => item._id.toString() === installmentId)
      amount = amount - restPay
      while (amount > 0) {
        const i = installments[index + 1]
        const rest = i.payAmount + i.suspendedFee + i.lateFee - i.paidAmount
        if (amount >= rest) {
          const ins = await dataAccess.financeDataAccess.updateInstallment(i._id.toString(), {
            paidDate,
            paidMethod,
            paidAmount: i.payAmount,
            status: INSTALLMENT_STATUS.PAID
          })
          await dataAccess.historyDataAccess.createHistory({
            type: HISTORY_TYPES.UPDATED,
            title: `Installment Paid $${i.paidAmount}`,
            description: note ? note : 'paid',
            invoice: invoiceId,
            customer: invoice.customer,
            installment: ins._id,
            user: req.user.userId
          })
          amount = amount - rest
        } else {
          const ins = await dataAccess.financeDataAccess.updateInstallment(i._id.toString(), {
            paidDate,
            paidMethod,
            paidAmount: amount,
            status: INSTALLMENT_STATUS.LESS_PAID
          })
          await dataAccess.historyDataAccess.createHistory({
            type: HISTORY_TYPES.UPDATED,
            title: `Installment Paid $${amount}`,
            description: note ? note : 'paid',
            invoice: invoiceId,
            customer: invoice.customer,
            installment: ins._id,
            user: req.user.userId
          })
          amount = 0
        }
        index = index + 1
      }
      return res.sendStatus(StatusCodes.OK)
    }
    if (restPay > amount) {
      const ins = await dataAccess.financeDataAccess.updateInstallment(installmentId, {
        paidDate,
        paidMethod,
        paidAmount: amount,
        status: INSTALLMENT_STATUS.LESS_PAID
      })
      await dataAccess.historyDataAccess.createHistory({
        type: HISTORY_TYPES.UPDATED,
        title: `Installment Paid $${amount}`,
        description: note ? note : 'paid',
        invoice: invoiceId,
        customer: invoice.customer,
        installment: ins._id,
        user: req.user.userId
      })
      return res.sendStatus(StatusCodes.OK)
    }
    if (restPay === amount) {
      const ins = await dataAccess.financeDataAccess.updateInstallment(installmentId, {
        paidDate,
        paidMethod,
        paidAmount: installment.payAmount,
        status: INSTALLMENT_STATUS.PAID
      })
      await dataAccess.historyDataAccess.createHistory({
        type: HISTORY_TYPES.UPDATED,
        title: `Installment Paid $${installment.payAmount}`,
        description: note ? note : 'paid',
        invoice: invoiceId,
        customer: invoice.customer,
        installment: ins._id,
        user: req.user.userId
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
    const invoice = await dataAccess.financeDataAccess.getInvoiceById(invoiceId)
    const category = await dataAccess.invoiceCategoryDataAccess.getInvoiceCategory(invoice.category)
    const installments = await dataAccess.financeDataAccess.getInstallmentsByInvoiceId(invoiceId)
    await dataAccess.financeDataAccess.deleteManyInstallment({ invoice: invoiceId })
    let deposit = 0
    let payAmount = 0
    let qty = 0
    if (installments) {
      const depositInstallment = installments.find(item => item.type === INSTALLMENT_TYPES.DEPOSIT)
      if (depositInstallment) {
        deposit = depositInstallment.payAmount
      }
      const paymentInstallment = installments.find(item => item.type === INSTALLMENT_TYPES.PAYMENT)
      if (paymentInstallment) {
        payAmount = paymentInstallment.payAmount
        qty = depositInstallment ? installments.length - 1 : installments.length
      }
    }
    await dataAccess.historyDataAccess.createHistory({
      type: HISTORY_TYPES.DELETED,
      title: 'Installment Plan Removed',
      description: `Name: ${category.name} Deposit: $${deposit}, Payment: $${payAmount}, Qty: $${qty}`,
      invoice: invoiceId,
      customer: invoice.customer,
      user: req.user.userId
    })
    await dataAccess.historyDataAccess.removeManyHistory({ invoice: invoiceId, installment: { $exists: true } })
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
