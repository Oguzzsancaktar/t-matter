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
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'tasks'
      }
    ],
    expiredTaskSteps: [
      {
        type: Schema.Types.ObjectId,
        ref: 'expiredtasksteps'
      }
    ],
    index: {
      type: Number,
      default: 0
    },
    postponeCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
)

module.exports = Invoice = model('Invoice', InvoiceSchema)
