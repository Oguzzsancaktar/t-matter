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
const jobTitleDataAccess = require('./dynamic-variables-data-access/jobTitleDataAccess')
const colorDataAccess = require('./dynamic-variables-data-access/colorDataAccess')
const customerTypeDataAccess = require('./dynamic-variables-data-access/customerTypeDataAccess')

const refferedByDataAccess = require('./dynamic-variables-data-access/refferedBy')
const relativeTypeDataAccess = require('./dynamic-variables-data-access/relativeType')
const taskDataAccess = require('./task-data-access/taskDataAccess')
const activityDataAccess = require('./activity-data-access/activityDataAccess')
const financeDataAccess = require('./finance-data-access/financeDataAcces')
const invoiceCategoryDataAccess = require('./invoice-category-data-access/invoiceCategoryDataAccess')
const companyDataAccess = require('./company-data-access/companyDataAccess')
const historyDataAccess = require('./history-data-access/historyDataAccess')
const hrSettingDataAccess = require('./hr-setting-data-access/hrSettingDataAccess')
const hrTaskDataAccess = require('./hr-task-data-access/hrTaskDataAccess')

const customerWorkActivityDataAccess = require('./customer-work-activity-data-access/customerWorkActivityDataAccess')
const customerHistoryDataAccess = require('./history-data-access/customerHistoryDataAccess')
const activeTaskDataAccess = require('./active-task-data-access/activeTaskDataAccess')
const websiteSettingsDataAccess = require('./website-settings-data-access/websiteSettingsDataAccess')

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
  jobTitleDataAccess,
  refferedByDataAccess,
  relativeTypeDataAccess,
  customerDataAccess,
  taskDataAccess,
  activityDataAccess,
  financeDataAccess,
  invoiceCategoryDataAccess,
  companyDataAccess,
  colorDataAccess,
  customerTypeDataAccess,
  historyDataAccess,
  hrSettingDataAccess,
  hrTaskDataAccess,
  customerWorkActivityDataAccess,
  customerHistoryDataAccess,
  activeTaskDataAccess,
  websiteSettingsDataAccess
}
