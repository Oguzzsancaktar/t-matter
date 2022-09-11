const mongoose = require('mongoose')
const { STATUS_TYPES } = require('../../constants/constants')
const { Schema } = mongoose

const workflowCategorySchema = new Schema(
  {
    name: {
      required: true,
      type: String
    },
    color: {
      required: true,
      type: mongoose.Types.ObjectId,
      ref: 'Color'
    },
    status: {
      type: Number,
      default: STATUS_TYPES.ACTIVE
    }
  },
  { timestamps: true }
)

module.exports = WorkflowCategory = mongoose.model('WorkflowCategory', workflowCategorySchema)
