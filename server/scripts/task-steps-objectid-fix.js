const mongoose = require('mongoose')
const Task = require('../models/task')

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  const task = await Task.find().lean().exec()
  for (const t of task) {
    if (t.steps) {
      for (const s of t.steps) {
        if (s.responsibleUser) {
          s.responsibleUser =
            typeof s.responsibleUser === 'string'
              ? mongoose.Types.ObjectId(s.responsibleUser)
              : mongoose.Types.ObjectId(s.responsibleUser._id)
        }
        if (s.location) {
          s.location =
            typeof s.location === 'string'
              ? mongoose.Types.ObjectId(s.location)
              : mongoose.Types.ObjectId(s.location._id)
        }
        if (s.category) {
          s.category =
            typeof s.category === 'string'
              ? mongoose.Types.ObjectId(s.category)
              : mongoose.Types.ObjectId(s.category._id)
        }
      }
    }
    await Task.findByIdAndUpdate(t._id, t).exec()
  }
  process.exit(-1)
}

run()
