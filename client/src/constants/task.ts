import { EStatus, ITaskCreateDTO } from '@/models'

export const initialTask: ITaskCreateDTO = {
  expireDuration: 0,
  postponeTime: 0,
  category: {
    _id: '-1',
    name: 'Select Value',
    color: {
      _id: '',
      color: '',
      status: EStatus.Active
    }
  },
  location: {
    _id: '-1',
    name: 'Select Value'
  },
  responsibleUser: {
    _id: '-1',
    firstname: 'First Name',
    lastname: 'Last Name'
  },
  tabs: [],
  checklistItems: []
}
