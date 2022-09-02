const mongoose = require('mongoose')
const { STATUS_TYPES } = require('../../constants/constants')
const { Schema } = mongoose

const relativeTypeSchema = new Schema({
  relateTo: {
    required: true,
    type: String
  },
  relateFrom: {
    required: true,
    type: String
  },
  status: {
    type: Number,
    default: STATUS_TYPES.ACTIVE
  }
})

module.exports = RelativeType = mongoose.model('relativeType', relativeTypeSchema)
