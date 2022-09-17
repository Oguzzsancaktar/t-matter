const { Schema, model } = require('mongoose')

const historySchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    type: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    // NOT REQUIRED
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'Customer'
    },
    invoice: {
      type: Schema.Types.ObjectId,
      ref: 'Invoice'
    },
    installment: {
      type: Schema.Types.ObjectId,
      ref: 'Installment'
    }
  },
  {
    timestamps: true
  }
)

module.exports = History = model('History', historySchema)
