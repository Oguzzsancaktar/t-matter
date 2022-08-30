const authDataAccess = require('./auth-data-access/authDataAccess')
const salarySettingDataAccess = require('./salary-setting-data-access/salarySettingDataAccess')
const companyPricingDataAccess = require('./company-pricing-data-access/companyPricingDataAccess')
const workingScheduleDataAccess = require('./working-schedule-data-access/workingScheduleDataAccess')
const roleDataAccess = require('./role-data-access/roleDataAccess')
const userDataAccess = require('./user-data-access/userDataAccess')
const customerDataAccess = require('./customer-data-access/customerDataAccess')

const workflowDataAccess = require('./workflow-data-access/workflowDataAccess')
const timeLogDataAccess = require('./time-log-data-access/timeLogDataAccess')
const locationDataAccess = require('./dynamic-variables-data-access/locationDataAccess')
const refferedByDataAccess = require('./dynamic-variables-data-access/refferedBy')
const relativeTypeDataAccess = require('./dynamic-variables-data-access/relativeType')
const taskDataAccess = require('./task-data-access/taskDataAccess')
const activityDataAccess = require('./activity-data-access/activityDataAccess')
const financeDataAccess = require('./finance-data-access/financeDataAcces')
const invoiceCategoryDataAccess = require('./invoice-category-data-access/invoiceCategoryDataAccess')

module.exports = {
  authDataAccess,
  salarySettingDataAccess,
  companyPricingDataAccess,
  workingScheduleDataAccess,
  roleDataAccess,
  userDataAccess,
  workflowDataAccess,
  timeLogDataAccess,
  locationDataAccess,
  refferedByDataAccess,
  relativeTypeDataAccess,
  customerDataAccess,
  taskDataAccess,
  activityDataAccess,
  financeDataAccess,
  invoiceCategoryDataAccess
}
