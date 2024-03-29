import colors from '@/constants/colors'
import React from 'react'
import styled from 'styled-components'
import { TabIndex } from '../tab'
import { H1 } from '../texts'

interface IProps {
  isActive: boolean
  stepName: string
  stepIndex: number
  onClick: () => void
}

const WizzardNavigationItemContainer = styled.div<Pick<IProps, 'isActive'>>`
  height: 100%;
  width: 100%;
  background-color: ${({ isActive }) => (isActive ? colors.primary.light : colors.primary.dark)};
  transition: background-color 0.4s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const WizzardNavigationItem: React.FC<IProps> = ({ isActive, stepName, stepIndex, onClick }) => {
  return (
    <WizzardNavigationItemContainer isActive={isActive} onClick={onClick}>
      <TabIndex index={stepIndex} isActive={isActive} />
      <H1 margin="1rem 0 0 0" textAlign="center" color={isActive ? colors.blue.primary : colors.gray.disabled}>
        {stepName}
      </H1>
    </WizzardNavigationItemContainer>
  )
}

export default WizzardNavigationItem
