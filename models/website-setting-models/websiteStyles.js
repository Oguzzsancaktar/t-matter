const mongoose = require('mongoose')
const { Schema } = mongoose

const websiteStylesSchema = new Schema(
  {
    websitePaddingColor: {
      type: Schema.Types.ObjectId,
      ref: 'Colors',
      required: true
    },

    websiteBackgroundColor: {
      type: Schema.Types.ObjectId,
      ref: 'Colors',
      required: true
    },

    websiteModalButtonsBackgroundColor: {
      type: Schema.Types.ObjectId,
      ref: 'Colors',
      required: true
    },

    websiteModalButtonsBorderColor: {
      type: Schema.Types.ObjectId,
      ref: 'Colors',
      required: true
    },

    navlinkTextColor: {
      type: Schema.Types.ObjectId,
      ref: 'Colors',
      required: true
    },

    navlinkHoverTextColor: {
      type: Schema.Types.ObjectId,
      ref: 'Colors',
      required: true
    },

    informationHeaderTextColor: {
      type: Schema.Types.ObjectId,
      ref: 'Colors',
      required: true
    },

    informationDescriptionTextColor: {
      type: Schema.Types.ObjectId,
      ref: 'Colors',
      required: true
    },

    informationButtonTextColor: {
      type: Schema.Types.ObjectId,
      ref: 'Colors',
      required: true
    },

    contactIconColor: {
      type: Schema.Types.ObjectId,
      ref: 'Colors',
      required: true
    },

    contactTitleColor: {
      type: Schema.Types.ObjectId,
      ref: 'Colors',
      required: true
    },

    contactContentColor: {
      type: Schema.Types.ObjectId,
      ref: 'Colors',
      required: true
    },

    websiteModalIconColor: {
      type: Schema.Types.ObjectId,
      ref: 'Colors',
      required: true
    },

    websiteModalTitleColor: {
      type: Schema.Types.ObjectId,
      ref: 'Colors',
      required: true
    },

    websiteModalContentColor: {
      type: Schema.Types.ObjectId,
      ref: 'Colors',
      required: true
    },

    navbarBorderColor: {
      type: Schema.Types.ObjectId,
      ref: 'Colors',
      required: true
    },

    websitePaddingVertical: {
      type: Number,
      required: true
    },
    websitePaddingHorizontal: {
      type: Number,
      required: true
    },

    websiteBorderRadius: {
      type: Number,
      required: true
    },
    websiteImageBorderRadius: {
      type: Number,
      required: true
    },

    websiteModalButtonsBorderRadius: {
      type: Number,
      required: true
    },
    websiteModalButtonsBorderWidth: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
)

module.exports = WebsiteStyles = mongoose.model('WebsiteStyles', websiteStylesSchema)
