const mongoose = require('mongoose')
const Customer = require('../models/customer')

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  const customers = await Customer.find().lean().exec()

  for (const customer of customers) {
    if (customer.customerType === 0) {
      customer.customerType = mongoose.Types.ObjectId('636108d115070e01a633c57d')
    }

    if (customer.customerType === 1) {
      customer.customerType = mongoose.Types.ObjectId('636108db15070e01a633c583')
    }
    await Customer.findByIdAndUpdate(customer._id, customer).exec()
  }

  process.exit(-1)
}

run()
