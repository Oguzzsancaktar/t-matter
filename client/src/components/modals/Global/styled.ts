import colors from '@constants/colors'
import styled from 'styled-components'
import { IContainerProps } from './types'

export const Modal = styled.div`
  align-items: center;
  justify-content: center;
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  overflow-y: auto;
  min-height: 700px;
`
export const Container = styled.div<IContainerProps>`
  /* display: grid; */
  position: relative;
  width: calc(100% - 4rem);
  // modal height LOOK
  max-height: 850px;
  height: ${({ height }) => (height ? height : '100%')};
  /* background-color: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : colors.white.secondary)}; */
  border-radius: 0.3rem;
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : 'none')};
  overflow-x: ${({ overflowX }) => (overflowX ? overflowX : '')};
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
