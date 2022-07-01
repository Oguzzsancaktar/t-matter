import { dayOfWeek, dayOfMonth } from '@/constants/dates'
import { EDays, IOption } from '@/models'

export const payrollTypeOptions = [
  { label: 'Monthly', value: 'monthly' },
  { label: 'Weekly', value: 'weekly' }
]

export const payrollDateOptions: IOption[] = Object.values(dayOfMonth).map(value => ({
  label: value.toString(),
  value: value.toString()
}))

export const payrollDayOptions: IOption[] = Object.values(dayOfWeek).map(value => ({
  label: EDays[value].toString(),
  value: value.toString()
}))
