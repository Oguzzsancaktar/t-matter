import { EStatus, ITaskCreateDTO } from '@/models'

const initialTask: ITaskCreateDTO = {
  stepIndex: 0,
  expireDuration: 0,
  postponeLimit: 0,
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

const TASK_CONDITIONS = {
  POSTPONE: 'POSTPONE',
  TIMER: 'TIMER',
  EXPIRE: 'EXPIRE'
}

const TASK_CONDITION_OPTIONS = [
  { label: 'Postpone', value: TASK_CONDITIONS.POSTPONE },
  { label: 'Timer', value: TASK_CONDITIONS.TIMER },
  { label: 'Expire', value: TASK_CONDITIONS.EXPIRE },
  { label: 'All', value: 'ALL' }
]

export { TASK_CONDITIONS, initialTask, TASK_CONDITION_OPTIONS }
