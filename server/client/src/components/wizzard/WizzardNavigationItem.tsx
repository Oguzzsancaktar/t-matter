import colors from '@/constants/colors'
import React from 'react'
import styled from 'styled-components'
import { ItemContainer } from '../item-container'
import { JustifyBetweenColumn } from '../layout'
import { TabIndex } from '../tab'
import { H1 } from '../texts'

interface IProps {
  isActive: boolean
  stepName: string
  stepIndex: number
}

const WizzardNavigationItemContainer = styled.div<Pick<IProps, 'isActive'>>`
  height: 100%;
  width: 100%;
  background-color: ${({ isActive }) => (isActive ? colors.green.primary : colors.gray.secondary)};
  display: flex;
  align-items: center;
`

const WizzardNavigationItem: React.FC<IProps> = ({ isActive, stepName, stepIndex }) => {
  return (
    <WizzardNavigationItemContainer isActive={isActive}>
      <TabIndex index={stepIndex} isActive={isActive} />
      <H1>{stepName}</H1>
    </WizzardNavigationItemContainer>
  )
}

export default WizzardNavigationItem
