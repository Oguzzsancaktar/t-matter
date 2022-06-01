import { IClient, IContact } from '@models/index'
export default interface IClientCreateDTO extends Omit<IClient, 'reliableCustomers' | 'status'> {
  reliableInCompany?: string[]
  createContact?: IContact[]
}
