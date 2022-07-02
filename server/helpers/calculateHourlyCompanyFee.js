const calculateHourlyCompanyFee = () => {
  const dataAccess = require('../data-access')

  return new Promise(async (resolve, reject) => {
    try {
      const { dailyAverageExpenseAmount, specifiedCompanyProfit } =
        await dataAccess.companyPricingDataAccess.getCompanyPricing()
      const activeUsers = await dataAccess.userDataAccess.findUsersAndPopulateSalarySetting()
      const defaultSalarySetting = await dataAccess.salarySettingDataAccess.findDefaultSalarySetting()
      let employerHourlyFee = 0
      for (const user of activeUsers) {
        if (user.salarySetting.length > 0) {
          employerHourlyFee = employerHourlyFee + user.salarySetting[0].defaultPayrollRate
          continue
        }
        employerHourlyFee = employerHourlyFee + defaultSalarySetting.defaultPayrollRate
      }
      resolve({
        employerCount: activeUsers.length,
        employerHourlyFee,
        hourlyCompanyFee:
          employerHourlyFee + dailyAverageExpenseAmount + (dailyAverageExpenseAmount * specifiedCompanyProfit) / 100
      })
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = calculateHourlyCompanyFee
