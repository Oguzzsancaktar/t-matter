import { dayOfWeek, dayOfMonth } from '@/constants/dates'
import { EDays, IOption } from '@/models'

export const payrollTypeOptions = [
  { label: 'Monthly', value: '0' },
  { label: 'Weekly', value: '1' }
]

export const payrollDateOptions: IOption[] = Object.values(dayOfMonth).map(value => ({
  label: value.toString(),
  value: value.toString()
}))

export const payrollDayOptions: IOption[] = Object.values(dayOfWeek).map(value => ({
  label: EDays[value].toString(),
  value: value.toString()
}))
