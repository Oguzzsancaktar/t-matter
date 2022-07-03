const mongoose = require('mongoose')
const { STATUS_TYPES } = require('../../constants/constants')
const { Schema } = mongoose

const workflowPlanStep = new Schema({
  checklistItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'workflowchecklists'
    }
  ],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'workflowcategories'
  },
  expireDuration: {
    type: Number
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'locations'
  },
  postponeTime: {
    type: Number
  },
  responsibleUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  stepColor: {
    type: String
  }
})

const workflowPlanSchema = new Schema(
  {
    name: {
      required: true,
      type: String
    },
    steps: {
      required: true,
      type: [workflowPlanStep]
    },
    status: {
      type: Number,
      default: STATUS_TYPES.ACTIVE
    }
  },
  { timestamps: true }
)

module.exports = WorkflowPlan = mongoose.model('workflowPlan', workflowPlanSchema)
