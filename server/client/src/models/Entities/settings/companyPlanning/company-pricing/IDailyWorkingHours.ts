import { IWorkDay } from '@/models'

export default interface IDailyWorkingHours {
  Monday: IWorkDay
  Tuesday: IWorkDay
  Wednesday: IWorkDay
  Thursday: IWorkDay
  Friday: IWorkDay
  Saturday: IWorkDay
  Sunday: IWorkDay
}
