const calculateHourlyCompanyFee = () => {
  const { clockToSeconds, secondsToTimeWithDisplay } = require('../utils/date-utils/dateUtils')
  const dataAccess = require('../data-access')

  return new Promise(async (resolve, reject) => {
    try {
      const [companyPricing] = await dataAccess.companyPricingDataAccess.getPopulatedCompanyPricing()
      const { dailyAverageExpenseAmount, specifiedCompanyProfit, workingSchedule: ws } = companyPricing
      const { workingSchedule } = ws

      const { totalWorkingDays, totalWorkingHours } = Object.keys(workingSchedule).reduce(
        (acc, key) => {
          if (workingSchedule[key].isChecked) {
            acc.totalWorkingDays += 1
            acc.totalWorkingHours +=
              clockToSeconds(workingSchedule[key].endTime) - clockToSeconds(workingSchedule[key].startTime)
          }
          return acc
        },
        { totalWorkingHours: 0, totalWorkingDays: 0 }
      )

      const avgWorkingHours = +secondsToTimeWithDisplay(totalWorkingHours / totalWorkingDays).split(' ')[0]
      const dailyAverageExpenseAmountDivided = dailyAverageExpenseAmount / avgWorkingHours

      const activeUsers = await dataAccess.userDataAccess.findActiveUsersAndPopulateSalarySetting()
      const defaultSalarySetting = await dataAccess.salarySettingDataAccess.findDefaultSalarySetting()
      let employerHourlyFee = 0
      for (const user of activeUsers) {
        if (user.salarySetting.length > 0) {
          employerHourlyFee = employerHourlyFee + user.salarySetting[0].defaultPayrollRate
          continue
        }
        employerHourlyFee = employerHourlyFee + defaultSalarySetting.defaultPayrollRate
      }

      const hourlyCompanyFee =
        employerHourlyFee +
        dailyAverageExpenseAmountDivided +
        ((employerHourlyFee + dailyAverageExpenseAmountDivided) / 100) * specifiedCompanyProfit

      resolve({
        employerCount: activeUsers.length,
        employerHourlyFee,
        hourlyCompanyFee
      })
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = calculateHourlyCompanyFee
