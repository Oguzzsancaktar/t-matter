const mongoose = require('mongoose')
const { Schema } = mongoose

const websiteImagesSchema = new Schema(
  {
    company_logo: { type: String, default: '' },
    company_img: { type: String, default: '' },
    modal_section_img_1: { type: String, default: '' },
    modal_section_img_2: { type: String, default: '' },
    modal_section_img_3: { type: String, default: '' },
    modal_section_img_4: { type: String, default: '' },
    cloudinary_id: { type: String, default: '' }
  },
  { timestamps: false }
)

module.exports = WebsiteImages = mongoose.model('WebsiteImages', websiteImagesSchema)
