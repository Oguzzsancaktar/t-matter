const authDataAccess = require('./auth-data-access/authDataAccess')
const salarySettingDataAccess = require('./salary-setting-data-access/salarySettingDataAccess')
const companyPricingDataAccess = require('./company-pricing-data-access/companyPricingDataAccess')
const workingScheduleDataAccess = require('./working-schedule-data-access/workingScheduleDataAccess')
const roleDataAccess = require('./role-data-access/roleDataAccess')

module.exports = {
  authDataAccess,
  salarySettingDataAccess,
  companyPricingDataAccess,
  workingScheduleDataAccess,
  roleDataAccess
}
