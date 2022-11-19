const WebsiteTextSettings = require('../../models/website-setting-models/websiteTexts')
const WebsiteStyleSettings = require('../../models/website-setting-models/websiteStyles')

const createOrUpdateWebsiteTextSettings = async body => {
  try {
    const websiteTextSettings = await WebsiteTextSettings.findOne({})

    if (!websiteTextSettings) {
      const newWebsiteTextSettings = new WebsiteTextSettings({
        ...body
      })

      return await newWebsiteTextSettings.save()
    }

    const updatedWebsiteTextSettings = await WebsiteTextSettings.findOneAndUpdate(
      { _id: websiteTextSettings._id },
      { $set: { ...body } },
      { new: true }
    )

    return updatedWebsiteTextSettings
  } catch (error) {
    console.log(error)
  }
}

const getTextSettings = async () => {
  try {
    const websiteTextSettings = await WebsiteTextSettings.findOne({})
    return websiteTextSettings
  } catch (error) {
    console.log(error)
  }
}

const createOrUpdateWebsiteStyleSettings = async body => {
  try {
    const websiteStyleSettings = await WebsiteStyleSettings.findOne({})

    if (!websiteStyleSettings) {
      const newWebsiteStyleSettings = new WebsiteStyleSettings({
        ...body
      })

      return await newWebsiteStyleSettings.save()
    }

    const updatedWebsiteStyleSettings = await WebsiteStyleSettings.findOneAndUpdate(
      { _id: websiteStyleSettings._id },
      { $set: { ...body } },
      { new: true }
    )

    return updatedWebsiteStyleSettings
  } catch (error) {
    console.log(error)
  }
}

const getStyleSettings = async () => {
  try {
    return await WebsiteStyleSettings.aggregate([
      {
        $lookup: {
          from: 'colors',
          localField: 'websitePaddingColor',
          foreignField: '_id',
          as: 'websitePaddingColor'
        }
      },
      {
        $unwind: {
          path: '$websitePaddingColor',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'colors',
          localField: 'websiteBackgroundColor',
          foreignField: '_id',
          as: 'websiteBackgroundColor'
        }
      },
      {
        $unwind: {
          path: '$websiteBackgroundColor',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'colors',
          localField: 'websiteModalButtonsBackgroundColor',
          foreignField: '_id',
          as: 'websiteModalButtonsBackgroundColor'
        }
      },
      {
        $unwind: {
          path: '$websiteModalButtonsBackgroundColor',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'colors',
          localField: 'websiteModalButtonsBorderColor',
          foreignField: '_id',
          as: 'websiteModalButtonsBorderColor'
        }
      },
      {
        $unwind: {
          path: '$websiteModalButtonsBorderColor',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'colors',
          localField: 'navlinkTextColor',
          foreignField: '_id',
          as: 'navlinkTextColor'
        }
      },
      {
        $unwind: {
          path: '$navlinkTextColor',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'colors',
          localField: 'navlinkHoverTextColor',
          foreignField: '_id',
          as: 'navlinkHoverTextColor'
        }
      },
      {
        $unwind: {
          path: '$navlinkHoverTextColor',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'colors',
          localField: 'informationHeaderTextColor',
          foreignField: '_id',
          as: 'informationHeaderTextColor'
        }
      },
      {
        $unwind: {
          path: '$informationHeaderTextColor',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'colors',
          localField: 'informationDescriptionTextColor',
          foreignField: '_id',
          as: 'informationDescriptionTextColor'
        }
      },
      {
        $unwind: {
          path: '$informationDescriptionTextColor',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'colors',
          localField: 'informationButtonTextColor',
          foreignField: '_id',
          as: 'informationButtonTextColor'
        }
      },
      {
        $unwind: {
          path: '$informationButtonTextColor',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'colors',
          localField: 'contactIconColor',
          foreignField: '_id',
          as: 'contactIconColor'
        }
      },
      {
        $unwind: {
          path: '$contactIconColor',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'colors',
          localField: 'contactTitleColor',
          foreignField: '_id',
          as: 'contactTitleColor'
        }
      },
      {
        $unwind: {
          path: '$contactTitleColor',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'colors',
          localField: 'contactContentColor',
          foreignField: '_id',
          as: 'contactContentColor'
        }
      },
      {
        $unwind: {
          path: '$contactContentColor',
          preserveNullAndEmptyArrays: true
        }
      },

      {
        $lookup: {
          from: 'colors',
          localField: 'websiteModalIconColor',
          foreignField: '_id',
          as: 'websiteModalIconColor'
        }
      },
      {
        $unwind: {
          path: '$websiteModalIconColor',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'colors',
          localField: 'websiteModalTitleColor',
          foreignField: '_id',
          as: 'websiteModalTitleColor'
        }
      },
      {
        $unwind: {
          path: '$websiteModalTitleColor',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'colors',
          localField: 'websiteModalContentColor',
          foreignField: '_id',
          as: 'websiteModalContentColor'
        }
      },
      {
        $unwind: {
          path: '$websiteModalContentColor',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'colors',
          localField: 'navbarBorderColor',
          foreignField: '_id',
          as: 'navbarBorderColor'
        }
      },
      {
        $unwind: {
          path: '$navbarBorderColor',
          preserveNullAndEmptyArrays: true
        }
      }
    ]).exec()
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  createOrUpdateWebsiteTextSettings,
  getTextSettings,
  createOrUpdateWebsiteStyleSettings,
  getStyleSettings
}
