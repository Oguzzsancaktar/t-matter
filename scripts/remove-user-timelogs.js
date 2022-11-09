const mongoose = require('mongoose')
const TimeLog = require('../models/timeLog')

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  await TimeLog.deleteMany({ owner: '634ee76c60a09c981dbbe2cc' })

  process.exit(-1)
}

run()
