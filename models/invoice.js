const { Schema, model } = require('mongoose')
//a
const InvoiceSchema = new Schema(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Invoicecategories'
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'Customers'
    },
    total: Number,
    amount: Number,
    discount: Number,
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tasks'
      }
    ],
    expiredTaskSteps: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Expiredtasksteps'
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
