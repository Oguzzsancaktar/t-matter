const dataAccess = require('../../data-access')
const utils = require('../../utils')

const createCompanyPricing = async (req, res) => {
  const { body } = req
  try {
    const [companyPricing] = await dataAccess.companyPricingDataAccess.getCompanyPricing()
    if (companyPricing) {
      return res.status(400).json(utils.errorUtils.errorInstance({ message: 'Company Pricing already exists' }))
    }
    const workingSchedule = await dataAccess.workingScheduleDataAccess.createWorkingSchedule(body.workingSchedule)
    body.workingSchedule = workingSchedule._id
    await dataAccess.companyPricingDataAccess.createCompanyPricing(body)
    res.sendStatus(201)
  } catch (error) {
    console.log(error)
    res.status(500).json(utils.errorUtils.errorInstance({ message: 'Error while creating company pricing' }))
  }
}

const updateCompanyPricing = async (req, res) => {
  const { body } = req
  try {
    const [companyPricing] = await dataAccess.companyPricingDataAccess.getCompanyPricing()
    const workingSchedule = await dataAccess.workingScheduleDataAccess.updateWorkingSchedule(
      companyPricing.workingSchedule,
      body.workingSchedule
    )
    body.workingSchedule = workingSchedule._id
    await dataAccess.companyPricingDataAccess.updateCompanyPricing(companyPricing._id, body)
    const [newCompanyPricing] = await dataAccess.companyPricingDataAccess.getPopulatedCompanyPricing()
    res.status(200).json(newCompanyPricing)
  } catch (error) {
    console.log(error)
    res.status(500).json(utils.errorUtils.errorInstance({ message: 'Error while updating company pricing' }))
  }
}

const getCompanyPricing = async (req, res) => {
  try {
    const [companyPricing] = await dataAccess.companyPricingDataAccess.getPopulatedCompanyPricing()
    if (!companyPricing) {
      return res.status(404).json(utils.errorUtils.errorInstance({ message: 'Company Pricing not found' }))
    }
    res.status(200).json(companyPricing)
  } catch (error) {
    console.log(error)
    res.status(500).json(utils.errorUtils.errorInstance({ message: 'Error while getting company pricing' }))
  }
}

module.exports = {
  createCompanyPricing,
  updateCompanyPricing,
  getCompanyPricing
}
