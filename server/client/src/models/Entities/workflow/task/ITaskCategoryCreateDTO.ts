import { ITaskCategory } from '@/models'
export default interface ITaskCategoryCreateDTO extends Omit<ITaskCategory, '_id' | 'status'> {}
