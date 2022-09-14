const mongoose = require('mongoose')
const { STATUS_TYPES } = require('../../constants/constants')
const { Schema } = mongoose

const customerTypeSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    color: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Color'
    },
    status: {
      type: Number,
      default: STATUS_TYPES.ACTIVE
    }
  },
  { timestamps: true }
)

module.exports = CustomerType = mongoose.model('CustomerType', customerTypeSchema)
