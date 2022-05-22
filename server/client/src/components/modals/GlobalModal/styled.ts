import colors from '@constants/colors'
import styled from 'styled-components'
import { IContainerProps, IModalProps } from './types'

export const Modal = styled.div<IModalProps>`
  align-items: center;
  justify-content: center;
  z-index: 999;
  display: ${({ show }) => (show ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
`
export const Container = styled.div<IContainerProps>`
  position: relative;
  width: calc(100% - 2rem);
  height: 70%;
  background-color: white;
  border-radius: 0.3rem;
  max-width: ${({ size }) =>
    size === 'xl' ? '1600' : size === 'lg' ? '1200' : size === 'md' ? '900' : size === 'sm' ? '600' : '100'}px;
`

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  transform: translate(50%, -50%);
  position: absolute;
  top: 0;
  right: 0;
  background-color: ${colors.blue.primary};
  color: ${colors.white.light};
  cursor: pointer;
  border-radius: 0.3rem;
  transition: all 0.4s ease-in-out;
  &:hover {
    transform: translate(40%, -40%);
  }
`

export const MinimizeButton = styled.button`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 30px;
  height: 30px;
  position: absolute;
  top: -5px;
  right: 15px;
  background-color: transparent;
  color: ${colors.blue.primary};
  cursor: pointer;
  border-radius: 0.3rem;
  transition: all 0.4s ease-in-out;
  &:hover {
    color: ${colors.white.bg};
  }
`
