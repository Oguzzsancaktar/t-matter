const CompanyInfo = require('../../models/companyInfo')

const companyInfoCreate = data => {
  return CompanyInfo.create(data)
}

const getCompanyInfo = () => {
  return CompanyInfo.findOne()
}

const updateCompanyInfo = (id, data) => {
  return CompanyInfo.findByIdAndUpdate(id, data)
}

module.exports = {
  companyInfoCreate,
  getCompanyInfo,
  updateCompanyInfo
}
