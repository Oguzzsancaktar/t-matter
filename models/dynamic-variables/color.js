const mongoose = require('mongoose')
const { STATUS_TYPES } = require('../../constants/constants')
const { Schema } = mongoose

const colorSchema = new Schema(
  {
    color: {
      type: String,
      required: true
    },
    status: {
      type: Number,
      default: STATUS_TYPES.ACTIVE
    }
  },
  { timestamps: true }
)

module.exports = JobTitle = mongoose.model('Color', colorSchema)
