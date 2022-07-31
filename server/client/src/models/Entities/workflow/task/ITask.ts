import { ILocation, ITaskChecklist, IUser } from '@models/index'
import ITab from '../ITab'
import ITaskCategory from './ITaskCategory'

export default interface ITask {
  _id: string
  expireDuration: number
  postponeTime: number
  category: Pick<ITaskCategory, '_id' | 'name'>
  location: Pick<ILocation, '_id' | 'name'>
  responsibleUser: Pick<IUser, '_id' | 'firstname' | 'lastname'> | IUser
  tabs: ITab['name'][]
  checklistItems: ITaskChecklist[]
  stepColor: string
}
