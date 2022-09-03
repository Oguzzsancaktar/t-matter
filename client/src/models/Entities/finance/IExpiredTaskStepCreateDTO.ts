import { ICustomer, ICustomerTask, IUser } from '@/models'

interface IExpiredTaskStepCreateDTO {
  stepIndex: number
  expiredTime: number
  task: ICustomerTask['_id']
  customer: ICustomer['_id']
  user: IUser['_id']
  index: number
  isInvoiced: boolean
}

export default IExpiredTaskStepCreateDTO
