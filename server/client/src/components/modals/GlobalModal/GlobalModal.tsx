import React from 'react'
import useAccessStore from '@hooks/useAccessStore'
import { closeModal, minimizeModal } from '@store/index'
import { CloseButton, Container, MinimizeButton, Modal } from './styled'
import { Minus, X } from 'react-feather'
import colors from '@constants/colors'
import { IModal } from '@/models'

interface IProps {
  modal: IModal
}

const GlobalModal: React.FC<IProps> = ({ modal }) => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const handleModalClose = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    dispatch(closeModal(modal))
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
