import colors from '@/constants/colors'
import { EStatus } from '@/models'

export const selectColorForStatus = (status: EStatus) => {
  let color = colors.white.bg

  if (status === EStatus.Active) {
    return (color = colors.green.primary)
  }

  if (status === EStatus.Inactive) {
    return (color = colors.gray.primary)
  }

  return color
}
