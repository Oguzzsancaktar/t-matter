import { ITask } from '@/models'

export default interface ITaskCreateDTO extends Omit<ITask, '_id' | 'duration' | 'price'> {
  // checklistItems: Pick<ITaskChecklist, '_id' | 'name'>[]
}
