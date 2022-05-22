const mongoose = require('mongoose')
const { Schema } = mongoose

const taskSchema = new Schema({
  title: {
    required: true,
    type: String
  }
})

module.exports = Task = mongoose.model('task', taskSchema)
