const authController = require('./auth-controller/authController')
const salarySettingController = require('./salary-setting-controller/salarySettingController')
const companyPricingController = require('./company-pricing-controller/companyPricingController')
const roleController = require('./role-controller/roleController')
const userController = require('./user-controller/userController')
const workflowController = require('./workflow-controller/workflowController')
const dynamicVariableController = require('./dynamic-variables-controller/dynamicVariablesController')

module.exports = {
  salarySettingController,
  authController,
  companyPricingController,
  roleController,
  userController,
  workflowController,
  dynamicVariableController
}
