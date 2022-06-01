import { IContactCreateDTO } from '@/models'
import { IClient } from '@models/index'
export default interface IClientCreateDTO extends Omit<IClient, 'reliableCustomers' | 'status'> {
  reliableInCompany?: string[]
  createContact?: IContactCreateDTO[]
}
