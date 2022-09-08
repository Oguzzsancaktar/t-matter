const mongoose = require('mongoose')
const { STATUS_TYPES } = require('../../constants/constants')
const { Schema } = mongoose

const refferedBySchema = new Schema({
  name: {
    required: true,
    type: String
  },
  color: {
    required: true,
    type: String
  },
  status: {
    type: Number,
    default: STATUS_TYPES.ACTIVE
  }
})

module.exports = RefferedBy = mongoose.model('RefferedBy', refferedBySchema)
