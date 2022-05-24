import React from 'react'
import useAccessStore from '@hooks/useAccessStore'
import { closeModal, minimizeModal } from '@store/index'
import { Minus, X } from 'react-feather'
import colors from '@constants/colors'
import { IModal } from '@/models'
import { CloseButton, Container, MinimizeButton, Modal } from './styled'

interface IProps {
  modal: IModal
}

const GlobalModal: React.FC<IProps> = ({ modal }) => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const handleModalClose = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    dispatch(closeModal(modal.id))
  }

  const handleModalMinimize = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    dispatch(minimizeModal(modal))
  }

  return (
    <Modal>
      <Container size={modal?.size}>
        {modal?.body}
        <CloseButton onClick={handleModalClose}>
          <X color={colors.white.light} fontWeight="600" />
        </CloseButton>
        <MinimizeButton onClick={handleModalMinimize}>
          <Minus color={colors.blue.primary} fontWeight="600" />
        </MinimizeButton>
      </Container>
    </Modal>
  )
}

export default GlobalModal
