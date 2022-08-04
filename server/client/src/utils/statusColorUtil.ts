import colors from '@/constants/colors'
import { EStatus, ETaskStatus } from '@/models'

export const selectColorForStatus = (status: number) => {
  let color = colors.white.bg

  if (status === EStatus.Active) {
    return (color = colors.green.primary)
  }

  if (status === EStatus.Inactive) {
    return (color = colors.gray.primary)
  }

  if (status === ETaskStatus.Completed) {
    return (color = colors.green.primary)
  }

  if (status === ETaskStatus.Canceled) {
    return (color = colors.red.primary)
  }

  if (status === ETaskStatus.Not_Started) {
    return (color = colors.gray.primary)
  }

  if (status === ETaskStatus.Progress) {
    return (color = colors.blue.primary)
  }

  return color
}

export const selectColorForTaskStatus = (status: number) => {
  let color = colors.white.bg

  if (status === ETaskStatus.Completed) {
    return (color = colors.green.primary)
  }

  if (status === ETaskStatus.Canceled) {
    return (color = colors.red.primary)
  }

  if (status === ETaskStatus.Not_Started) {
    return (color = colors.gray.primary)
  }

  if (status === ETaskStatus.Progress) {
    return (color = colors.blue.primary)
  }

  return color
}
