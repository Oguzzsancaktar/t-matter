const mongoose = require('mongoose')
// const { difference } = require('../helpers/difference')
const { Schema } = mongoose
const { difference } = require('lodash')

const taskSchema = new Schema(
  {
    startDate: {
      required: true,
      type: Number
    },
    workHistory: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User'
        },
        date: {
          type: Date,
          default: Date.now
        },
        time: {
          type: Number,
          default: 0
        }
      }
    ],
    name: {
      type: String
    },
    steps: [
      {
        type: Object,
        required: true
      }
    ],
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'Customers'
    },
    workflowId: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: 'Workflows'
    },
    totalDuration: {
      type: Number
    },
    totalPrice: {
      type: Number
    },
    isInvoiced: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number
    },
    status: {
      type: Number
    }
  },
  {
    timestamps: true
  }
)

taskSchema.pre('findOneAndUpdate', async function (next) {
  const data = await this.model.findOne(this.getQuery()).lean()
  const oldSteps = data.steps
  const newSteps = this._update.steps

  if (oldSteps.length === newSteps.length) {
    for (let i = 0; i < oldSteps.length; i++) {
      const oldStep = oldSteps[i]
      const newStep = newSteps[i]
      for (let j = 0; j < newStep.workedTimes.length; j++) {
        const oldWorkedTime = oldStep.workedTimes[j] || { time: 0 }
        const newWorkedTime = newStep.workedTimes[j]

        if (oldWorkedTime.time !== newWorkedTime.time) {
          this._update?.workHistory?.push({
            user: newWorkedTime.user,
            time: newWorkedTime.time - oldWorkedTime.time,
            date: new Date()
          })
        }
      }
    }
  }
  next()
})

module.exports = Task = mongoose.model('Task', taskSchema)
