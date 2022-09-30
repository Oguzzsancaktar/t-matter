import { ILocation, ITaskChecklist, IUser } from '@models/index'
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

  expireDuration: number
  passedTime: { user: IUser; time: number }[]

  postponeTime: number
  usedPostpone: number
  postponedDate: string

  checklistItems: ITaskChecklist[]
}
