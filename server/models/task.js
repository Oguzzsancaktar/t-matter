const mongoose = require('mongoose')
const { Schema } = mongoose

const taskSchema = new Schema({
  startDate: {
    required: true,
    type: Date,
  },
  name: {
    required: true,
    type: String
  },
  steps: [{
    type: Object,
    required: true,
  }],
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'customers',
  }
})

module.exports = Task = mongoose.model('task', taskSchema)
