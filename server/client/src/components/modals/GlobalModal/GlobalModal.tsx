import React from 'react'
import useAccessStore from '@/hooks/useAccessStore'
import { hideModal, selectIsModalOpen, selectModal } from '@/store'
import { CloseButton, Container, Modal } from './styled'

const GlobalModal = () => {
  const { useAppDispatch, useAppSelector } = useAccessStore()
  const dispatch = useAppDispatch()

  const isModalOpen = useAppSelector(selectIsModalOpen)
  const modal = useAppSelector(selectModal)

  const handleModalClose = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    dispatch(hideModal())
  }

  return (
    <Modal show={isModalOpen}>
      <Container size={modal?.size}>
        {modal?.body}
        <CloseButton onClick={handleModalClose}>x</CloseButton>
      </Container>
    </Modal>
  )
}

export default GlobalModal
