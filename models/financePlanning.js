const mongoose = require('mongoose')
const Schema = mongoose.Schema

const financePlanningItem = {
  isChecked: {
    type: Boolean
  },
  value: {
    type: Number
  }
}

const financePlanningExtendItem = {
  isChecked: { type: Boolean },
  days: { type: Number },
  percentage: { type: Number },
  feeCalculationType: { type: String },
  notifyUsers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  ]
}

const FinancePlanningSchema = new Schema({
  minDepositAmount: financePlanningItem,
  minInstallmentAmount: financePlanningItem,
  installmentPostponeLimit: financePlanningItem,
  installmentPostponeTimeLimit: financePlanningItem,
  activeTimeSlipAmount: financePlanningItem,
  inactiveTimeSlipAmount: financePlanningItem,
  pastDueLateFee: financePlanningExtendItem,
  suspendedFee: financePlanningExtendItem
})

module.exports = FinancePlanning = mongoose.model('FinancePlanning', FinancePlanningSchema)
