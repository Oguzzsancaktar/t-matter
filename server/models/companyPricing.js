const mongoose = require('mongoose');
const PAYROLL = require("../constants/payroll");
const Schema = mongoose.Schema;

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
    ref: 'WorkingSchedule',
  },
  payrollType: {
    type: Number,
    required: true,
    default: PAYROLL.MONTHLY
  },
  payrollDay: {
    type: Number,
    required: true,
    default: 1
  },
})

module.exports = CompanyPricing = mongoose.model('companyPricing', CompanyPricingSchema)
