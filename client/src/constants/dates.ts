import { EDays, EMonths } from '@/models'

export const dayOfWeek: EDays[] = [1, 2, 3, 4, 5, 6, 7]
export const monthOfYear: EMonths[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
export const dayOfMonth: number[] = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31
]

export const PERIODS = {
  DAILY: 'DAILY',
  WEEKLY: 'WEEKLY',
  MONTHLY: 'MONTHLY',
  YEARLY: 'YEARLY'
}

export const days = [
  { value: '' + 1, label: '1 Days' },
  { value: '' + 2, label: '2 Days' },
  { value: '' + 3, label: '3 Days' },
  { value: '' + 4, label: '4 Days' },
  { value: '' + 5, label: '5 Days' },
  { value: '' + 6, label: '6 Days' },
  { value: '' + 7, label: '7 Days' },
  { value: '' + 8, label: '8 Days' },
  { value: '' + 9, label: '9 Days' },
  { value: '' + 10, label: '10 Days' },
  { value: '' + 11, label: '11 Days' },
  { value: '' + 12, label: '12 Days' },
  { value: '' + 13, label: '13 Days' },
  { value: '' + 14, label: '14 Days' },
  { value: '' + 15, label: '15 Days' },
  { value: '' + 16, label: '16 Days' },
  { value: '' + 17, label: '17 Days' },
  { value: '' + 18, label: '18 Days' },
  { value: '' + 19, label: '19 Days' },
  { value: '' + 20, label: '20 Days' },
  { value: '' + 21, label: '21 Days' },
  { value: '' + 22, label: '22 Days' },
  { value: '' + 23, label: '23 Days' },
  { value: '' + 24, label: '24 Days' },
  { value: '' + 25, label: '25 Days' },
  { value: '' + 26, label: '26 Days' },
  { value: '' + 27, label: '27 Days' },
  { value: '' + 28, label: '28 Days' },
  { value: '' + 29, label: '29 Days' },
  { value: '' + 30, label: '30 Days' }
]

export type TPeriod = typeof PERIODS[keyof typeof PERIODS]
