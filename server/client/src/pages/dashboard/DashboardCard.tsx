import { Column, ItemContainer } from '@/components'
import colors from '@/constants/colors'
import React from 'react'

interface IProps {
  head: React.ReactNode
}

const DashboardCard: React.FC<IProps> = ({ head, children }) => {
  return (
    <ItemContainer
      width="100%"
      height="100%"
      borderRadius="0.3rem"
      borderBottom={'1px solid ' + colors.gray.secondary}
      borderTop={'1px solid ' + colors.gray.secondary}
      borderLeft={'1px solid ' + colors.gray.secondary}
      borderRight={'1px solid ' + colors.gray.secondary}
      overflow="hidden"
      backgroundColor={colors.white.secondary}
    >
      <Column width="100%" height="100%">
        <ItemContainer width="100%" height="45px" backgroundColor={colors.blue.primary + '70'}>
          {head}
        </ItemContainer>

        <ItemContainer width="100%" height="calc(100% - 45px)" padding="1rem" overflow="auto">
          {children}
        </ItemContainer>
      </Column>
    </ItemContainer>
  )
}

export default DashboardCard
