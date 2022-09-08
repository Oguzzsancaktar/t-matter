const dataAccess = require('../../data-access')
const { StatusCodes } = require('http-status-codes')
const cloudinary = require('../../utils/upload-utils/cloudinary')

const updateCompanyInfo = async (req, res) => {
  try {
    const companyInfo = await dataAccess.companyDataAccess.getCompanyInfo()
    if (!companyInfo) {
      await dataAccess.companyDataAccess.companyInfoCreate(req.body)
    }
    await dataAccess.companyDataAccess.updateCompanyInfo(companyInfo._id, req.body)
    res.sendStatus(StatusCodes.OK)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const getCompanyInfo = async (req, res) => {
  try {
    const companyInfo = await dataAccess.companyDataAccess.getCompanyInfo()
    res.status(StatusCodes.OK).send(companyInfo)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const uploadCompanyLogo = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path)
    const companyInfo = await dataAccess.companyDataAccess.getCompanyInfo()
    await dataAccess.companyDataAccess.updateCompanyInfo(companyInfo._id, {
      profile_img: result.secure_url,
      cloudinary_id: result.public_id
    })
    res.sendStatus(StatusCodes.OK)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

module.exports = {
  updateCompanyInfo,
  getCompanyInfo,
  uploadCompanyLogo
}
