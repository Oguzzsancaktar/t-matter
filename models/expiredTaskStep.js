const mongoose = require('mongoose')
const { Schema } = mongoose

const expiredTaskStepSchema = new Schema(
  {
    stepIndex: {
      type: Number
    },
    expiredTime: {
      type: Number //seconds
    },
    expiredTimePrice: {
      type: Number
    },
    task: {
      type: Schema.Types.ObjectId,
      ref: 'tasks'
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'customers'
    },
    index: {
      type: Number
    },
    isInvoiced: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

module.exports = ExpiredTaskStep = mongoose.model('expiredtaskstep', expiredTaskStepSchema)
