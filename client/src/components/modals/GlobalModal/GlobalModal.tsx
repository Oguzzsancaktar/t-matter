import React from 'react'
import useAccessStore from '@/hooks/useAccessStore'
import { ESize } from '@/models/Enumarables'
import { selectIsModalOpen, selectModal } from '@/store'
import styled from 'styled-components'
import { CircleButtonPrimary } from '@/components/button'

type IModalProps = {
  show: boolean
}

type IContainerProps = {
  size?: ESize
}

const Modal = styled.div<IModalProps>`
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
const Container = styled.div<IContainerProps>`
  position: relative;
  width: 100%;
  height: 70%;
  background-color: white;
  max-width: ${({ size }) =>
    size === 'xl' ? '1200' : size === 'lg' ? '900' : size === 'md' ? '600' : size === 'sm' ? '300' : '100'}px;
`

const CloseButton = styled(CircleButtonPrimary)`
  position: absolute;
  top: 0;
  right: 0;
`

const GlobalModal = () => {
  const { useAppSelector } = useAccessStore()
  const isModalOpen = useAppSelector(selectIsModalOpen)
  const modal = useAppSelector(selectModal)

  console.log('isModalOpen', isModalOpen)

  return (
    <Modal show={isModalOpen}>
      <CloseButton>x</CloseButton>
      <Container size={modal?.size}>{modal?.body}</Container>
    </Modal>
  )
}

export default GlobalModal
