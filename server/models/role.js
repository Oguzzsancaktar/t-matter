const mongoose = require('mongoose')
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
  }
})

module.exports = Role = mongoose.model('role', roleSchema)
