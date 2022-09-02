const { Schema, model } = require('mongoose')
const { STATUS_TYPES } = require('../constants/constants')

const InvoiceCategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  status: {
    type: Number,
    required: true,
    default: STATUS_TYPES.ACTIVE
  }
})

module.exports = InvoiceCategory = model('InvoiceCategory', InvoiceCategorySchema)
