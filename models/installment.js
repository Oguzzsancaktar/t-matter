const { Schema, model } = require('mongoose')

const InvoiceSchema = new Schema(
  {
    type: {
      type: String, // DEPOSIT - PAYMENT
      required: true
    },
    invoice: {
      type: Schema.Types.ObjectId,
      ref: 'Invoices',
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
      type: Number,
      default: 0
    },
    lateFee: {
      type: Number,
      default: 0
    },
    suspendedFee: {
      type: Number,
      default: 0
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
