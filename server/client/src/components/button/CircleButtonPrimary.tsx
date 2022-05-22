import colors from '@constants/colors'
import React from 'react'
import styled from 'styled-components'

interface Props {
  children?: React.ReactNode
  content?: string
}

const CircleButtonSC = styled.button`
  font-family: 'Chillax-Regular';
  cursor: pointer;
  padding: 0.4rem 0.6rem;
  border-radius: 0.3rem;
  border: 1px solid ${colors.green.primary};
  background-color: ${colors.green.primary};
  color: ${colors.green.primary};
  transition: background 0.3s ease-in-out;
  &:hover {
    background-color: ${colors.green.primary};
  }
`

const CircleButtonPrimary: React.FC<Props> = ({ children, ...rest }) => {
  return <CircleButtonSC type="submit">{children}</CircleButtonSC>
}

export default CircleButtonPrimary
