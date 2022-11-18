const dataAccess = require('../../data-access')
const { StatusCodes } = require('http-status-codes')

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

module.exports = {
  createOrUpdateWebsiteTextSettings,
  getWebsiteTextSettings
}
