import React, { useEffect } from 'react'
import useAccessStore from '@hooks/useAccessStore'
import { closeModal, minimizeModal } from '@store/index'
import { Minus, X } from 'react-feather'
import colors from '@constants/colors'
import { IModal } from '@/models'
import { CloseButton, Container, MinimizeButton, Modal } from './styled'
import ReactTooltip from 'react-tooltip'

interface IProps {
  modal: IModal
}

const GlobalModal: React.FC<IProps> = ({ modal }) => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const handleModalClose = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    if (modal.onClose) {
      modal.onClose()
    }
    dispatch(closeModal(modal.id))
  }

  const handleModalMinimize = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    if (modal.onClose) {
      modal.onClose()
    }
    dispatch(minimizeModal(modal))
  }

  useEffect(() => {
    ReactTooltip.rebuild()
  }, [modal])

  return (
    <Modal>
      <Container
        backgroundColor={modal.backgroundColor}
        maxWidth={modal?.maxWidth}
        height={modal?.height}
        width={modal?.width}
      >
        {modal?.body}
        <CloseButton onClick={handleModalClose}>
          <X color={colors.white.light} fontWeight="600" />
        </CloseButton>
        <MinimizeButton onClick={handleModalMinimize}>
          <Minus color={colors.blue.primary} fontWeight="600" />
        </MinimizeButton>
      </Container>
      <ReactTooltip className="tooltip-z-index" />
    </Modal>
  )
}

export default GlobalModal
