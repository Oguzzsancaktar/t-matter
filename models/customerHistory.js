const mongoose = require('mongoose')
const { Schema } = mongoose

const customerHistory = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
      required: true
    },

    type: {
      type: Number,
      required: true
    },
    responsible: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
)

module.exports = CustomerHistory = mongoose.model('CustomerHistory', customerHistory)
