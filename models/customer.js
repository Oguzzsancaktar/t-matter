const mongoose = require('mongoose')
const { Schema } = mongoose
const { STATUS_TYPES } = require('../constants/constants')
const { mongo } = require('mongoose')

const CustomerSchema = new Schema(
  {
    profile_img: String,
    cloudinary_id: String,
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
    birthday: {
      required: false,
      type: Date
    },
    birthplace: {
      required: false,
      type: String
    },
    // ortak
    customerType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CustomerType',
      required: false
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

    refferedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'RefferedBy',
      required: false
    },
    gender: {
      required: true,
      type: Number
    },
    jobTitle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JobTitle',
      required: true
    },
    reliableCustomers: [],

    status: {
      type: Number,
      default: STATUS_TYPES.ACTIVE
    }
  },
  { timestamps: true }
)

module.exports = Customer = mongoose.model('Customer', CustomerSchema)
