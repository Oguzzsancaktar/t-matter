const mongoose = require('mongoose')
const PAYROLL = require('../constants/payroll')
const Schema = mongoose.Schema

const CompanyPricingSchema = new Schema({
  dailyAverageExpenseAmount: {
    type: Number,
    required: true
  },
  specifiedCompanyProfit: {
    type: Number,
    required: true
  },
  workingSchedule: {
    type: mongoose.Types.ObjectId,
    ref: 'WorkingSchedule'
  }
})

module.exports = CompanyPricing = mongoose.model('companyPricing', CompanyPricingSchema)
