const mongoose = require('mongoose')
const { STATUS_TYPES } = require('../../constants/constants')
const { Schema } = mongoose

const workflowPlanSchema = new Schema({
  name: {
    required: true,
    type: String
  },
  duration: {
    required: true,
    type: Number
  },
  price: {
    required: true,
    type: Number
  },
  steps: {
    required: true,
    type: []
  },
  status: {
    type: Number,
    default: STATUS_TYPES.ACTIVE
  }
})

module.exports = WorkflowPlan = mongoose.model('workflowPlan', workflowPlanSchema)
