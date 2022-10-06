const mongoose = require('mongoose')
const Task = require('../models/task')
const Installment = require('../models/installment')
const Invoice = require('../models/invoice')
const ExpiredTaskStep = require('../models/expiredTaskStep')
const History = require('../models/history')
const Activity = require('../models/activity')

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  await Task.deleteMany({})
  await Invoice.deleteMany({})
  await Installment.deleteMany({})
  await ExpiredTaskStep.deleteMany({})
  await History.deleteMany({})
  await Activity.deleteMany({})

  process.exit(-1)
}

run()
