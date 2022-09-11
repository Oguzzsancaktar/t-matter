const mongoose = require('mongoose')
const { STATUS_TYPES } = require('../../constants/constants')
const { Schema } = mongoose

const workflowPlanStep = new Schema({
  stepIndex: {
    type: Number,
    required: true
  },
  checklistItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'WorkflowChecklists'
    }
  ],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WorkflowCategories'
  },
  expireDuration: {
    type: Number
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Locations'
  },
  postponeTime: {
    type: Number
  },
  tabs: [],
  responsibleUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
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

module.exports = WorkflowPlan = mongoose.model('WorkflowPlan', workflowPlanSchema)
