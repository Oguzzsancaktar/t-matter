const mongoose = require('mongoose')
const { STATUS_TYPES } = require('../constants/constants')
const { Schema } = mongoose

const ROLE_PERMISSIONS = {
  ALL: 0
}

const roleSchema = new Schema(
  {
    name: {
      required: true,
      type: String
    },
    permissions: {
      type: Object,
      default: { [ROLE_PERMISSIONS.ALL]: true }
    },
    status: {
      type: Number,
      default: STATUS_TYPES.ACTIVE
    }
  },
  { timestamps: true }
)

module.exports = Role = mongoose.model('role', roleSchema)
