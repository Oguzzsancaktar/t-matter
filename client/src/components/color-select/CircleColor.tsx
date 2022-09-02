import React from 'react'
import styled from 'styled-components'

interface IProps {
  color: string
  cursor?: string
  isSelected?: boolean
  onClick?: () => void | undefined
}

const CircleColorContainer = styled.div<IProps>`
  border: 2px solid ${({ isSelected }) => (isSelected ? '#000' : 'transparent')};
  width: ${({ isSelected }) => (isSelected ? '25px' : '20px')};
  height: ${({ isSelected }) => (isSelected ? '25px' : '20px')};
  border-radius: 50%;
  background-color: ${({ color }) => color && color};
  transition: all 0.4s ease-in-out;
  cursor: ${({ cursor }) => (cursor ? cursor : 'pointer')};
`
const CircleColor: React.FC<IProps> = ({ onClick, ...rest }) => {
  return <CircleColorContainer onClick={onClick} {...rest} />
}

export default CircleColor
