import { IColor, ITaskCategory } from '@/models'
export default interface ITaskCategoryUpdateDTO extends Omit<ITaskCategory, 'color'> {
  color: IColor['_id']
}
