import { ItemContainer } from '@/components'
import colors from '@/constants/colors'
import React from 'react'
import styled from 'styled-components'

interface IProps {
  children: React.ReactNode | string
}

const NavItem = styled.h3`
  text-transform: uppercase;
  color: #ffce00;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  transition: all 0.4s ease-in;

  &:hover {
    letter-spacing: 2px;
    color: ${colors.gray.dark};
    transition: all 0.4s ease-in;
  }
`

const NavbarItem: React.FC<IProps> = ({ children }) => {
  return (
    <ItemContainer width="auto" margin="0 1rem">
      <NavItem>{children}</NavItem>
    </ItemContainer>
  )
}

export default NavbarItem
