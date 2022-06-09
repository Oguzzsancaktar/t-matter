const mongoose = require('mongoose')
const { STATUS_TYPES } = require('../constants/constants')
const { Schema } = mongoose

const ROLE_PERMISSIONS = {
  ALL: 0
}

const roleSchema = new Schema({
  name: {
    required: true,
    type: String
  },
  permissions: {
    type: Object,
    defaultValue: { [ROLE_PERMISSIONS.ALL]: true }
  },
  status: {
    type: Number,
    defaultValue: STATUS_TYPES.ACTIVE
  }
})

module.exports = Role = mongoose.model('role', roleSchema)
