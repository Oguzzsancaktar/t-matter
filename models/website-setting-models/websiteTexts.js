const mongoose = require('mongoose')
const { Schema } = mongoose

const websiteTextsSchema = new Schema(
  {
    informationHeader: {
      type: String
    },
    informationDescription: {
      type: String
    },
    informationButtonText: {
      type: String
    },
    navlinks: {
      type: Array
    },
    contactInformations: {
      type: Array
    },
    modalSections: {
      type: Array
    }
  },
  { timestamps: true }
)

module.exports = WebsiteTexts = mongoose.model('WebsiteTexts', websiteTextsSchema)
