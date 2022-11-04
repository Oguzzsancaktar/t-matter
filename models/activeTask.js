const mongoose = require('mongoose')
const { Schema } = mongoose

const activeTaskSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: true
    },
    step: {
      type: Number
    },
    task: {
      type: Schema.Types.ObjectId,
      ref: 'Tasks'
    }
  },
  { timestamps: true }
)

module.exports = ActiveTask = mongoose.model('ActiveTask', activeTaskSchema)
