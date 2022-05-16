// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { CircleButtonPrimary } from '@/components/button'
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
  width: 100%;
  height: 70%;
  background-color: white;
  max-width: ${({ size }) =>
    size === 'xl' ? '1200' : size === 'lg' ? '900' : size === 'md' ? '600' : size === 'sm' ? '300' : '100'}px;
`

export const CloseButton = styled(CircleButtonPrimary)`
  position: absolute;
  top: 0;
  right: 0;
`
