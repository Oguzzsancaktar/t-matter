import { Column, ItemContainer } from '@/components'
import colors from '@/constants/colors'
import React from 'react'

interface IProps {
  head: React.ReactNode
}

const DashboardCard: React.FC<IProps> = ({ head, children }) => {
  return (
    <ItemContainer width="100%" height="100%" overflow="hidden" backgroundColor="transparent">
      <Column width="100%" height="100%">
        <ItemContainer
          width="100%"
          height="55px"
          backgroundColor={colors.secondary.light}
          padding="0 1rem"
          margin="0 0 0.3rem 0"
          borderBottom={'1px solid ' + colors.gray.middle}
          borderTop={'1px solid ' + colors.gray.middle}
          borderLeft={'1px solid ' + colors.gray.middle}
          borderRight={'1px solid ' + colors.gray.middle}
          borderRadius="0.2rem"
        >
          {head}
        </ItemContainer>

        <ItemContainer
          width="100%"
          height="calc(100% - 55px - 0.3rem)"
          padding="1rem"
          overflow="auto"
          backgroundColor={colors.white.secondary}
          borderBottom={'1px solid ' + colors.gray.middle}
          borderTop={'1px solid ' + colors.gray.middle}
          borderLeft={'1px solid ' + colors.gray.middle}
          borderRight={'1px solid ' + colors.gray.middle}
          borderRadius="0.2rem"
        >
          {children}
        </ItemContainer>
      </Column>
    </ItemContainer>
  )
}

export default DashboardCard
