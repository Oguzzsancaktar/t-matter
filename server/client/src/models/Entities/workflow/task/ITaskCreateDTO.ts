import { ITask, ITaskChecklist } from '@/models'

export default interface ITaskCreateDTO extends Omit<ITask, '_id'> {
  // checklistItems: Pick<ITaskChecklist, '_id' | 'name'>[]
}
