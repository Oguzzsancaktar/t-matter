import colors from '@/constants/colors'
import React from 'react'
import { Airplay } from 'react-feather'
import { ItemContainer } from '../item-container'
import { JustifyCenterColumn, JustifyCenterRow } from '../layout'
import { H1 } from '../texts'

const NoTableData = () => {
  return (
    <ItemContainer width="100%" height="100%">
      <JustifyCenterColumn height="100%">
        <Airplay size={100} color={colors.gray.disabled} />
        <H1 width="auto" fontSize="2rem" color={colors.gray.disabled}>
          No Data
        </H1>
      </JustifyCenterColumn>
    </ItemContainer>
  )
}

export default NoTableData
