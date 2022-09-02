import { H1, ItemContainer, JustifyBetweenColumn, JustifyCenterColumn, JustifyCenterRow } from '@/components'
import { ConfirmCancelButtons } from '@/components/button'
import colors from '@/constants/colors'
import useAccessStore from '@/hooks/useAccessStore'
import { closeModal } from '@/store'
import React from 'react'
import { ModalHeader, ModalBody } from '../types'

interface IProps {
  title: string
  onConfirm: () => void
  modalId: string
}
const ConfirmModal: React.FC<IProps> = ({ title, onConfirm, modalId }) => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const handleCloseReactiveModal = () => {
    dispatch(closeModal(`reactiveUserModal-${modalId}`))
  }

  return (
    <JustifyBetweenColumn height="100%">
      <ModalHeader>
        <ItemContainer>
          <JustifyCenterRow width="100%">
            <H1 margin="0" textAlign="center" fontWeight="700" color={colors.white.primary}>
              {title}
            </H1>
          </JustifyCenterRow>
        </ItemContainer>
      </ModalHeader>

      <ModalBody>
        <ItemContainer>
          <JustifyCenterColumn height="100%" padding="2rem 0">
            <ConfirmCancelButtons onConfirm={onConfirm} onCancel={handleCloseReactiveModal} />
          </JustifyCenterColumn>
        </ItemContainer>
      </ModalBody>
    </JustifyBetweenColumn>
  )
}

export default ConfirmModal
