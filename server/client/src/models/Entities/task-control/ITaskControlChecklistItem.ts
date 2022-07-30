import { ITaskChecklist } from '@/models'

export default interface ITaskControlChecklistItem extends Omit<ITaskChecklist, '_id'> {
  isCompleted: boolean
}
