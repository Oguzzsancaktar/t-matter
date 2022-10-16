import { ILocation, ITaskChecklist, ITaskUserWorkTime, IUser } from '@models/index'
import ITaskCategory from './ITaskCategory'

export default interface ITaskItem {
  _id?: string
  category: Omit<ITaskCategory, 'status'>
  location: Omit<ILocation, 'status'>
  tabs: string[]
  responsibleUser: Pick<IUser, '_id' | 'firstname' | 'lastname' | 'profile_img'> | IUser
  startDate: number
  endDate: number
  stepStatus: number
  addedFrom?: IUser
  expireDuration: number
  workedTimes: ITaskUserWorkTime[]
  totalPassedTime: number
  postponeTime: number
  usedPostpone: number
  postponedDate: string
  seen?: {
    completed: boolean
    cancelled: boolean
    new: boolean
    transfer: boolean
    condition: boolean
  }
  checklistItems: ITaskChecklist[]
}
