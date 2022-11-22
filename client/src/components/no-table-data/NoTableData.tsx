import colors from '@/constants/colors'
import React from 'react'
import { Airplay } from 'react-feather'
import { ItemContainer } from '../item-container'
import { JustifyCenterColumn } from '../layout'
import { H1 } from '../texts'

interface IProps {
  text?: string
}
const NoTableData: React.FC<IProps> = ({ text = 'No Data' }) => {
  return (
    <ItemContainer width="100%" height="100%">
      <JustifyCenterColumn height="100%">
        <Airplay size={100} color={colors.gray.disabled} />
        <H1 width="auto" fontSize="32px" color={colors.gray.disabled}>
          {text}
        </H1>
      </JustifyCenterColumn>
    </ItemContainer>
  )
}

export default NoTableData
