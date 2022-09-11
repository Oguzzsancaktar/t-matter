const mongoose = require('mongoose')
const { STATUS_TYPES } = require('../../constants/constants')
const { Schema } = mongoose

const refferedBySchema = new Schema(
  {
    name: {
      required: true,
      type: String
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

module.exports = RefferedBy = mongoose.model('RefferedBy', refferedBySchema)
