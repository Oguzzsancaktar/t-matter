const dataAccess = require('../data-access')
const Installment = require('../models/installment')
const { INSTALLMENT_STATUS } = require('../constants/finance')
const moment = require('moment/moment')
const installmentFee = async date => {
  console.log('INSTALLMENT FEE CRON JOB', date)
  const financePlanning = await dataAccess.financeDataAccess.getFinancePlanning()
  const unPaidInstallments = Installment.find({
    status: { $ne: INSTALLMENT_STATUS.PAID },
    lateFee: { $eq: 0 },
    suspendedFee: { $eq: 0 }
  })
    .lean()
    .exec()
  for (const installment of unPaidInstallments) {
    if (
      financePlanning.pastDueLateFee.isChecked &&
      -moment().isAfter(moment(installment.payDate)) > financePlanning.pastDueLateFee.days
    ) {
      const fee = (installment.payAmount * financePlanning.pastDueLateFee.percentage) / 100
      dataAccess.financeDataAccess.updateInstallment(installment._id.toString(), {
        pastDueLateFee: fee
      })
    }
    if (
      financePlanning.suspendedFee.isChecked &&
      -moment().diff(moment(installment.payDate), 'days') > financePlanning.suspendedFee.days
    ) {
      const fee = (installment.payAmount * financePlanning.suspendedFee.percentage) / 100
      dataAccess.financeDataAccess.updateInstallment(installment._id.toString(), {
        suspendedFee: fee
      })
    }
  }
}

module.exports = { installmentFee }
