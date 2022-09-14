import React from 'react'
import styled from 'styled-components'
import { OutsideClick } from '@/components'

const SideDrawerStyled = styled.div<{ open?: boolean }>`
  height: calc(100% - 63px);
  background-color: white;
  box-shadow: 1px 0 7px rgba(0, 0, 0, 0.5);
  position: absolute;
  bottom: 0;
  right: 0;
  width: 20%;
  transition: all 0.3s ease-in-out;
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(100%)')};
  visibility: ${({ open }) => (open ? 'unset' : 'hidden')};
`

const SideDrawer: React.FC<{ isHistoryOpen?: boolean; onOutsideClick: () => void }> = ({
  children,
  isHistoryOpen,
  onOutsideClick
}) => {
  return (
    <OutsideClick onOutsideClick={onOutsideClick}>
      <SideDrawerStyled open={isHistoryOpen}>{children}</SideDrawerStyled>
    </OutsideClick>
  )
}

export default SideDrawer
