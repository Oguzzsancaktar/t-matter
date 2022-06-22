import React from 'react'
import colors from '@constants/colors'
import styled from 'styled-components'

interface IProps {
  index: number
  isActive: boolean
}

const IndexCircle = styled.span<Pick<IProps, 'isActive'>>`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.white.light};
  background-color: ${({ isActive }) => (isActive ? colors.cyan.primary : colors.gray.secondary)};
  font-weight: 500;
  width: 30px;
  height: 30px;
  border-radius: 0.3rem;
  margin-right: 0.3rem;
  transition: background 0.4s ease-in-out;
`
const TabIndex: React.FC<IProps> = ({ index, isActive }) => {
  return <IndexCircle isActive={isActive}>{index + 1}</IndexCircle>
}

export default TabIndex
