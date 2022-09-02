const { Schema, model } = require('mongoose')

const InvoiceSchema = new Schema(
  {
    type: {
      type: String, // DEPOSIT - PAYMENT
      required: true
    },
    invoice: {
      type: Schema.Types.ObjectId,
      ref: 'invoices'
    },
    payDate: {
      type: Date,
      required: true
    },
    payAmount: {
      type: Number,
      required: true
    },
    paidMethod: {
      type: String,
      required: true
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
    status: {
      type: String, // PAID - MOREPAID - LATEFEE - SUSPENDED
      required: true
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
