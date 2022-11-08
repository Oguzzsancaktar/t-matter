import { ITaskCategory, ILocation, IUser } from '@/models'
import ITaskControlChecklistItem from './ITaskControlChecklistItem'

export default interface ITaskControlStep {
  startDate: string
  expireDuration: number
  postponeCount: number
  postponeLimit: number
  totalDuration: number
  usedTime: number

  name: string // wf name + category
  location: ILocation
  responsibleUser: IUser

  tabs: string[]
  checklistItems: ITaskControlChecklistItem[]

  stepStatus: number
}
