const mongoose = require('mongoose')
const { STATUS_TYPES } = require('../../constants/constants')
const { Schema } = mongoose

const workflowChecklistSchema = new Schema(
  {
    name: {
      required: true,
      type: String
    },
    point: {
      required: true,
      type: Number
    },
    duration: {
      required: true,
      type: Number
    },
    status: {
      type: Number,
      default: STATUS_TYPES.ACTIVE
    }
  },
  { timestamps: true }
)

module.exports = WorkflowChecklist = mongoose.model('WorkflowChecklist', workflowChecklistSchema)
