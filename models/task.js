const mongoose = require('mongoose')
const { Schema } = mongoose

const taskSchema = new Schema(
  {
    startDate: {
      required: true,
      type: Number
    },
    name: {
      type: String
    },
    steps: [
      {
        type: Object,
        required: true
      }
    ],
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'Customers'
    },
    workflowId: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: 'Workflows'
    },
    totalDuration: {
      type: Number
    },
    totalPrice: {
      type: Number
    },
    isInvoiced: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number
    },
    status: {
      type: Number
    },
    isSeen: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

module.exports = Task = mongoose.model('Task', taskSchema)
