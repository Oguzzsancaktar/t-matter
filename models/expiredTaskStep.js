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
      ref: 'Tasks'
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'Users'
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'Customers'
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

module.exports = ExpiredTaskStep = mongoose.model('Expiredtaskstep', expiredTaskStepSchema)
