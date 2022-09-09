const dataAccess = require('../../data-access')
const utils = require('../../utils')
const calculateHourlyCompanyFee = require('../../helpers/calculateHourlyCompanyFee')

const createCompanyPricing = async (req, res) => {
  const { body } = req
  try {
    // const [companyPricing] = await dataAccess.companyPricingDataAccess.getCompanyPricing()
    // if (companyPricing) {
    //   return res.status(400).json(utils.errorUtils.errorInstance({ message: 'Company Pricing already exists' }))
    // }

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
    const companyPricing = await dataAccess.companyPricingDataAccess.getCompanyPricing()
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
    const summary = await calculateHourlyCompanyFee()
    res.status(200).json({
      ...companyPricing,
      workingSchedule: { ...companyPricing.workingSchedule, _id: undefined, __v: undefined },
      _id: undefined,
      summary
    })
  } catch (error) {
    console.log(error)
    res.status(500).json(utils.errorUtils.errorInstance({ message: 'Error while getting company pricing' }))
  }
}

const getCompanySummary = async (req, res) => {
  try {
    const companyPricing = await dataAccess.companyPricingDataAccess.getCompanyPricing()
    if (!companyPricing) {
      return res.status(404).json(utils.errorUtils.errorInstance({ message: 'Company Pricing not found' }))
    }
    const summary = await calculateHourlyCompanyFee()
    res.status(200).json(summary)
  } catch (e) {
    console.log(e)
    res.status(500).json(utils.errorUtils.errorInstance({ message: 'Error while getting company summary' }))
  }
}

module.exports = {
  createCompanyPricing,
  updateCompanyPricing,
  getCompanyPricing,
  getCompanySummary
}
