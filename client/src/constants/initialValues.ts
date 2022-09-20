import { IActivityCategoryCountsFilter, ICustomerCreateDTO } from '@models/index'
import { IColor, EStatus } from '@/models'

export const initialColor: IColor = {
  _id: '',
  color: '',
  status: EStatus.Active
}

export const initialCategoryCountsFilter: IActivityCategoryCountsFilter = {
  userId: '',
  categoryId: '',
  customerId: ''
}

export const initialCreateCustomer: ICustomerCreateDTO = {
  _id: '',
  customerType: 0,
  firstname: '',
  lastname: '',
  jobTitle: {
    _id: '',
    name: ''
  },
  email: '',
  phone: '',
  birthplace: '',
  country: '',
  city: '',
  state: '',
  zipcode: '',
  address: '',
  aSharpNumber: '',
  refferedBy: {
    _id: '',
    name: '',
    status: 0,
    color: initialColor
  },
  gender: 0,
  reliableInCompany: [],
  createContact: []
}
