const { Schema, model } = require('mongoose')

const InvoiceSchema = new Schema(
  {
    type: {
      type: String, // DEPOSIT - PAYMENT
      required: true
    },
    invoice: {
      type: Schema.Types.ObjectId,
      ref: 'invoices',
      required: true
    },
    payDate: {
      type: Date,
      required: true
    },
    payAmount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    paidMethod: {
      type: String
    },
    paidDate: {
      type: Date
    },
    paidAmount: {
      type: Number
    },
    lateFee: {
      type: Number
    },
    suspendedFee: {
      type: Number
    },
    notes: {
      type: [String]
    }
  },
  {
    timestamps: true
  }
)

module.exports = Installment = model('Installment', InvoiceSchema)
