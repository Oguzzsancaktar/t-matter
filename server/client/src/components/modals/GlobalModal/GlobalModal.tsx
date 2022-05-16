import React from 'react'
import useAccessStore from '@/hooks/useAccessStore'
import { selectIsModalOpen, selectModal } from '@/store'
import { CloseButton, Container, Modal } from './styled'

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
