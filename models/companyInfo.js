const mongoose = require('mongoose')
const { Schema } = mongoose

const companyInfoSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    website: {
      type: String,
      required: true
    },
    fax: {
      type: String,
      required: true
    },
    profile_img: String,
    cloudinary_id: String
  },
  { timestamps: true }
)

module.exports = CompanyInfo = mongoose.model('CompanyInfo', companyInfoSchema)
