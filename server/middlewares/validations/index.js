const authValidations = require('./auth-validations/authValidations')
const salarySettingValidations = require('./salary-setting-validations/salarySettingValidations')
const companyPricingValidations = require('./company-pricing-validations/companyPricingValidations')
const userValidations = require('./user-validations/userValidations')
const roleValidations = require('./role-validations/roleValidations')
const workflowValidations = require('./workflow-validations/workflowValidations')
const generalValidations = require('./common/generalValidations')

module.exports = {
  authValidations,
  salarySettingValidations,
  companyPricingValidations,
  userValidations,
  roleValidations,
  workflowValidations,
  generalValidations
}
