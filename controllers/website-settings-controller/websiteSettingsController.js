const dataAccess = require('../../data-access')
const { StatusCodes } = require('http-status-codes')
const cloudinary = require('../../utils/upload-utils/cloudinary')

const createOrUpdateWebsiteTextSettings = async (req, res) => {
  const { body } = req
  try {
    await dataAccess.websiteSettingsDataAccess.createOrUpdateWebsiteTextSettings(body)
    res.sendStatus(StatusCodes.CREATED)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const getWebsiteTextSettings = async (req, res) => {
  try {
    const websiteTextSettings = await dataAccess.websiteSettingsDataAccess.getTextSettings()
    res.status(StatusCodes.OK).json(websiteTextSettings)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const createOrUpdateWebsiteStyleSettings = async (req, res) => {
  const { body } = req
  try {
    await dataAccess.websiteSettingsDataAccess.createOrUpdateWebsiteStyleSettings(body)
    res.sendStatus(StatusCodes.CREATED)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const getWebsiteStyleSettings = async (req, res) => {
  try {
    const websiteStyleSettings = await dataAccess.websiteSettingsDataAccess.getStyleSettings()
    res.status(StatusCodes.OK).json(websiteStyleSettings[0])
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const createOrUpdateWebsiteImageSettings = async (req, res) => {
  const { fileName } = req.params
  try {
    const websiteImageSettings = await dataAccess.websiteSettingsDataAccess.getImageSettings()

    const result = await cloudinary.uploader.upload(req.file.path)

    if (websiteImageSettings) {
      websiteImageSettings[fileName] = result.secure_url
      await dataAccess.websiteSettingsDataAccess.createOrUpdateWebsiteImageSettings(websiteImageSettings)
    } else {
      const newWebsiteImageSettings = {
        [fileName]: result.secure_url
      }
      await dataAccess.websiteSettingsDataAccess.createOrUpdateWebsiteImageSettings(newWebsiteImageSettings)
    }

    res.sendStatus(StatusCodes.CREATED)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const getWebsiteImageSettings = async (req, res) => {
  try {
    const websiteImageSettings = await dataAccess.websiteSettingsDataAccess.getImageSettings()
    res.status(StatusCodes.OK).json(websiteImageSettings)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

module.exports = {
  createOrUpdateWebsiteTextSettings,
  getWebsiteTextSettings,
  createOrUpdateWebsiteStyleSettings,
  getWebsiteStyleSettings,
  createOrUpdateWebsiteImageSettings,
  getWebsiteImageSettings
}
