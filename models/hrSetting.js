const mongoose = require('mongoose')
const { TASK_TYPES } = require('../constants/hrConstants')
const { Schema } = mongoose

const hrSettingSchema = new Schema(
  {
    owner: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    },
    monthlyWorking: {
      isChecked: {
        type: Boolean,
        default: false
      },
      beforeNotificationDays: {
        type: Number,
        default: 0
      },
      days: {
        type: Number,
        default: 0
      },
      taskType: {
        type: String,
        default: TASK_TYPES.MENTAL
      },
      notificationReceivers: [
        {
          type: mongoose.Types.ObjectId,
          ref: 'User'
        }
      ]
    },
    loginLogout: {
      isChecked: {
        type: Boolean,
        default: false
      },
      taskType: {
        type: String,
        default: TASK_TYPES.ABSENT
      },
      notificationReceivers: [
        {
          type: mongoose.Types.ObjectId,
          ref: 'User'
        }
      ]
    },
    vocations: [
      {
        isChecked: {
          type: Boolean,
          default: false
        },
        taskType: {
          type: String,
          default: TASK_TYPES.VACATION
        },
        beforeNotificationDays: {
          type: Number,
          default: 0
        },
        afterHours: {
          type: Number,
          default: 0
        },
        days: {
          type: Number,
          default: 0
        },
        notificationReceivers: [
          {
            type: mongoose.Types.ObjectId,
            ref: 'User'
          }
        ]
      }
    ],
    specialDays: [
      {
        name: {
          type: String,
          default: ''
        },
        isChecked: {
          type: Boolean,
          default: false
        },
        beforeNotificationDays: {
          type: Number,
          default: 0
        },
        taskType: {
          type: String,
          default: TASK_TYPES.OTHERS
        },
        startDate: {
          type: Date
        },
        endDate: {
          type: Date
        },
        notificationReceivers: [
          {
            type: mongoose.Types.ObjectId,
            ref: 'User'
          }
        ]
      }
    ]
  },
  { timestamps: true }
)

module.exports = HrSetting = mongoose.model('hrSetting', hrSettingSchema)
