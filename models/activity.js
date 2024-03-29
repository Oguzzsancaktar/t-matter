const mongoose = require('mongoose')
const { Schema } = mongoose

const activitySchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: true
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'Customers'
    },
    step: {
      type: Number
    },
    stepCategory: {
      type: Schema.Types.ObjectId,
      ref: 'Categories'
    },
    usedTime: {
      type: Number
    },
    task: {
      type: Schema.Types.ObjectId,
      ref: 'Tasks'
    },
    type: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    links: {
      type: [
        {
          url: {
            type: String,
            required: true
          },
          text: {
            type: String,
            required: true
          }
        }
      ]
    }
  },
  { timestamps: true }
)

module.exports = Activity = mongoose.model('Activity', activitySchema)
