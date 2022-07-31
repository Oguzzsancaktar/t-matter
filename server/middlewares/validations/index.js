const authValidations = require('./auth-validations/authValidations')
const salarySettingValidations = require('./salary-setting-validations/salarySettingValidations')
const companyPricingValidations = require('./company-pricing-validations/companyPricingValidations')
const userValidations = require('./user-validations/userValidations')
const customerValidations = require('./customer-validations/customerValidations')
const roleValidations = require('./role-validations/roleValidations')
const workflowValidations = require('./workflow-validations/workflowValidations')
const generalValidations = require('./common/generalValidations')
const dynamicVariableValidations = require('./dynamic-variable-validations/dynamicVariableValidations')
const timeLogValidations = require('./time-log-validations/timeLogValidations')
const workingScheduleValidations = require('./working-schedule-validations')
const taskValidations = require('./task-validations/taskValidations')
const activityValidations = require('./activity-validations/activityValidations')

module.exports = {
  authValidations,
  salarySettingValidations,
  companyPricingValidations,
  userValidations,
  roleValidations,
  workflowValidations,
  generalValidations,
  dynamicVariableValidations,
  timeLogValidations,
  workingScheduleValidations,
  customerValidations,
  activityValidations,
  taskValidations
}
