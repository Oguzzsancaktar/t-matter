const mongoose = require('mongoose')
const { STATUS_TYPES } = require('../../constants/constants')
const { Schema } = mongoose

const jobTitleSchema = new Schema({
  name: {
    required: true,
    type: String
  },
  status: {
    type: Number,
    default: STATUS_TYPES.ACTIVE
  }
})

module.exports = JobTitle = mongoose.model('jobTitle', jobTitleSchema)
