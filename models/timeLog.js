const mongoose = require('mongoose')
const { Schema } = mongoose

const TimeLogSchema = new Schema(
  {
    logType: {
      type: Number
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
)

module.exports = TimeLog = mongoose.model('TimeLog', TimeLogSchema)
