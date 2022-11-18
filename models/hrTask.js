const mongoose = require('mongoose')
const { HR_TASK_TYPES } = require('../constants/hrConstants')
const { Schema } = mongoose

const HrTaskSchema = new Schema(
  {
    type: {
      type: String,
      enum: Object.values(HR_TASK_TYPES)
    },
    description: String,
    days: {
      type: Number,
      default: 0
    },
    startDate: {
      type: Date
    },
    endDate: {
      type: Date
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    isCompleted: {
      type: Boolean,
      default: false
    },
    month: {
      type: Number
    }
  },
  { timestamps: true }
)

module.exports = HrTask = mongoose.model('HrTask', HrTaskSchema)
