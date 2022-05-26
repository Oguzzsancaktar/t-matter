import { dayOfWeek, dayOfMonth } from '@/constants/dates'
import { EDays } from '@/models'

export const payrollPeriodOptions = [
  { label: 'Monthly', value: 'monthly' },
  { label: 'Weekly', value: 'weekly' }
]

export const payrollDateOptions = Object.values(dayOfMonth).map(value => ({ label: value, value: value }))
export const payrollDayOptions = Object.values(dayOfWeek).map(value => ({ label: EDays[value], value: value }))
