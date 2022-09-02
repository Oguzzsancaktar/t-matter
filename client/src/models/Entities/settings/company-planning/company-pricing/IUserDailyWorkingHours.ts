import { IDailyWorkingHours, IWorkDay } from '@/models'
export default interface IUserDailyWorkingHours {
  Monday?: IWorkDay
  Tuesday?: IWorkDay
  Wednesday?: IWorkDay
  Thursday?: IWorkDay
  Friday?: IWorkDay
  Saturday?: IWorkDay
  Sunday?: IWorkDay
}
