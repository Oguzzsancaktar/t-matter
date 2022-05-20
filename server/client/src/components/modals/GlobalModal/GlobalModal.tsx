import React from 'react'
import useAccessStore from '@hooks/useAccessStore'
import { hideModal, selectIsModalOpen, selectModal } from '@store/index'
import { CloseButton, Container, MinimizeButton, Modal } from './styled'
import { Minimize, Minus, X } from 'react-feather'
import colors from '@constants/colors'

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
        <CloseButton onClick={handleModalClose}>
          <X color={colors.white.light} fontWeight="600" />
        </CloseButton>
        <MinimizeButton onClick={handleModalClose}>
          <Minus color={colors.blue.primary} fontWeight="600" />
        </MinimizeButton>
      </Container>
    </Modal>
  )
}

export default GlobalModal
