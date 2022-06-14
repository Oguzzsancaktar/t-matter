import { ITaskCategory } from '@/models'
export default interface ITaskCategoryUpdateDTO extends Omit<ITaskCategory, '_id'> {}
