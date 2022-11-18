const WebsiteTextSettings = require('../../models/website-setting-models/websiteTexts')

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

module.exports = {
  createOrUpdateWebsiteTextSettings,
  getTextSettings
}
