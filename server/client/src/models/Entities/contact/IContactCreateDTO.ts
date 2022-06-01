import { IContact } from '@models/index'
export default interface IContactCreateDTO extends Omit<IContact, '_id'> {
  reliableInCompany?: string[]
  createContact?: IContactCreateDTO[]
}
