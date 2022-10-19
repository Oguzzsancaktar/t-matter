import { IUser, IUserDailyWorkingHours } from '@/models'
import { clockToSeconds } from '@utils/timeUtils'

const getUserMonthlyWorkingHours = (workingSchedule: IUserDailyWorkingHours) => {
  return (
    (Object.keys(workingSchedule).reduce((acc, curr) => {
      if (workingSchedule[curr].isChecked) {
        acc = acc + (clockToSeconds(workingSchedule[curr].endTime) - clockToSeconds(workingSchedule[curr].startTime))
      }
      return acc
    }, 0) /
      3600) *
    4
  )
}

export { getUserMonthlyWorkingHours }
