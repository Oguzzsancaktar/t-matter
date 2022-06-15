import { ITaskChecklist, IUser } from '@models/index'
import ILocation from '../ILocation'
import ITab from '../ITab'
import ITaskCategory from './ITaskCategory'

export default interface ITask {
  _id: string
  expireDuration: number
  postponeTime: number
  category: ITaskCategory
  location: ILocation
  responsibleUser: Pick<IUser, '_id' | 'firstname' | 'lastname'>
  tabs: ITab['name'][]
  checklistItems: ITaskChecklist[]
  stepColor: string
}