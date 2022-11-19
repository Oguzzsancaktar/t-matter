import { ItemContainer } from '@/components'
import colors from '@/constants/colors'
import React from 'react'
import styled from 'styled-components'

interface IProps {
  children: React.ReactNode | string
  color: string
  hoverColor: string
}

const NavItem = styled.h3<{ color: string; hoverColor: string }>`
  text-transform: uppercase;
  color: ${props => props.color};
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  transition: all 0.4s ease-in;

  &:hover {
    letter-spacing: 2px;
    color: ${props => props.hoverColor};
    transition: all 0.4s ease-in;
  }
`

const NavbarItem: React.FC<IProps> = ({ children, color = '#ffce00', hoverColor = '#ff8c19' }) => {
  return (
    <ItemContainer width="auto" margin="0 1rem">
      <NavItem color={color} hoverColor={hoverColor}>
        {children}
      </NavItem>
    </ItemContainer>
  )
}

export default NavbarItem
