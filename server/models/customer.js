const mongoose = require('mongoose')
const { Schema } = mongoose
const { STATUSES } = require('../constants/constants')
const { mongo } = require('mongoose')

const CustomerSchema = new Schema(
  {
    aSharpNumber: {
      required: false,
      type: String
    },
    country: {
      required: false,
      type: String
    },
    city: {
      required: false,
      type: String
    },
    state: {
      required: false,
      type: String
    },
    address: {
      required: false,
      type: String
    },
    zipcode: {
      required: false,
      type: String
    },

    // ortak
    customerType: {
      default: 0,
      type: Number
    },
    firstname: {
      required: true,
      type: String
    },
    lastname: {
      required: true,
      type: String
    },
    email: {
      required: true,
      unique: true,
      type: String
    },
    phone: {
      required: true,
      type: String
    },
    birthday: {
      required: true,
      type: Date
    },
    birthplace: {
      required: true,
      type: String
    },
    refferType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'relativeType'
    },
    gender: {
      required: true,
      type: Number
    },

    reliableInCompany: [],
    createContact: [],

    status: {
      required: true,
      type: Number,
      default: STATUSES.ACTIVE
    }
  },
  { timestamps: true }
)

module.exports = Customer = mongoose.model('customer', CustomerSchema)
