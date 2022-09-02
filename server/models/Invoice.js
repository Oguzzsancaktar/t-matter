const { Schema, model } = require('mongoose')
//a
const InvoiceSchema = new Schema(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: 'invoicecategories'
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'customers'
    },
    total: Number,
    amount: Number,
    discount: Number,
    addition: Number,
    additionReason: String,
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'tasks'
      }
    ]
  },
  {
    timestamps: true
  }
)

module.exports = Invoice = model('Invoice', InvoiceSchema)
