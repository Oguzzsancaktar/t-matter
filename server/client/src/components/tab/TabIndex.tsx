import React from 'react'
import colors from '@constants/colors'
import styled from 'styled-components'

interface IProps {
  index: number
  isActive: boolean
  tabColor?: string
}

const IndexCircle = styled.span<Pick<IProps, 'isActive' | 'tabColor'>>`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.white.light};
  background-color: ${({ isActive, tabColor }) =>
    tabColor ? tabColor : isActive ? colors.cyan.primary : colors.gray.secondary};
  font-weight: 500;
  width: 30px;
  height: 30px;
  border-radius: 0.3rem;
  margin-right: 0.3rem;
  transition: background 0.4s ease-in-out;
`
const TabIndex: React.FC<IProps> = ({ index, isActive, tabColor }) => {
  return (
    <IndexCircle isActive={isActive} tabColor={tabColor}>
      {index + 1}
    </IndexCircle>
  )
}

export default TabIndex
