const mongoose = require('mongoose')
const { Schema } = mongoose
const { STATUSES } = require('../constants/constants')

const UserSchema = new Schema({
  email: {
    required: true,
    unique: true,
    type: String
  },
  password: {
    required: true,
    type: String
  },
  firstName: {
    required: true,
    type: String
  },
  lastName: {
    required: true,
    type: String
  },
  birthday: {
    required: true,
    type: Date
  },
  phone: {
    required: true,
    type: String
  },
  country: {
    required: true,
    type: String
  },
  city: {
    required: true,
    type: String
  },
  state: {
    required: true,
    type: String
  },
  street: {
    required: true,
    type: String
  },
  zipCode: {
    required: true,
    type: String
  },
  gender: {
    required: true,
    type: Number
  },
  status: {
    required: true,
    type: Number,
    defaultValue: STATUSES.ACTIVE
  },
  role: {
    required: true,
    type: Number
  }
})

module.exports = User = mongoose.model('user', UserSchema)
