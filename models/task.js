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
      ref: 'customers'
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
    }
  },
  {
    timestamps: true
  }
)

module.exports = Task = mongoose.model('task', taskSchema)
