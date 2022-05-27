import React from 'react'
import { Row, TabIndex } from '@components/index'
import styled from 'styled-components'
import colors from '@constants/colors'

interface IProps {
  name: string
  index: number
  isActive: boolean
  margin?: string
  onClick: (e: React.MouseEvent) => void
}

const TabStyled = styled.div<Pick<IProps, 'margin'>>`
  margin: ${({ margin }) => margin && margin};
  cursor: pointer;
  text-decoration: none;
`

const TabName = styled.p<Pick<IProps, 'isActive'>>`
  transition: color 0.4s ease-in-out;
  color: ${({ isActive }) => (isActive ? colors.cyan.primary : colors.gray.secondary)};
`

const Tab: React.FC<IProps> = ({ name, index, isActive, margin, onClick }) => {
  return (
    <TabStyled margin={margin} onClick={onClick}>
      <Row>
        <TabIndex isActive={isActive} index={index} />
        <TabName isActive={isActive}>{name}</TabName>
      </Row>
    </TabStyled>
  )
}

export default Tab
