const CompanyPricing = require('../../models/companyPricing')

const createCompanyPricing = data => {
  return CompanyPricing.create(data)
}

const updateCompanyPricing = (id, data) => {
  return CompanyPricing.findByIdAndUpdate(id, data)
}

const getPopulatedCompanyPricing = async () => {
  return await CompanyPricing.aggregate([
    {
      $match: {}
    },
    {
      $lookup: {
        from: 'workingschedules',
        localField: 'workingSchedule',
        foreignField: '_id',
        as: 'workingSchedule'
      }
    },
    {
      $unwind: {
        path: '$workingSchedule'
      }
    }
  ]).exec()
}

const getCompanyPricing = () => {
  return CompanyPricing.findOne()
}

module.exports = {
  createCompanyPricing,
  updateCompanyPricing,
  getCompanyPricing,
  getPopulatedCompanyPricing
}
