const mongoose = require('mongoose')
const { Schema } = mongoose

const customerWorkActivitySchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
      required: true
    },

    type: {
      type: Number,
      required: true
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
)

module.exports = CustomerWorkActivity = mongoose.model('CustomerWorkActivity', customerWorkActivitySchema)
