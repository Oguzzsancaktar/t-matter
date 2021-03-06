import { H1, InnerWrapper, JustifyBetweenColumn, JustifyCenterColumn, JustifyCenterRow } from '@/components'
import { ConfirmCancelButtons } from '@/components/button'
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
        <InnerWrapper>
          <JustifyCenterRow width="100%">
            <H1 margin="0" textAlign="center">
              {title}
            </H1>
          </JustifyCenterRow>
        </InnerWrapper>
      </ModalHeader>

      <ModalBody>
        <InnerWrapper>
          <JustifyCenterColumn height="100%" padding="2rem 0">
            <ConfirmCancelButtons onConfirm={onConfirm} onCancel={handleCloseReactiveModal} />
          </JustifyCenterColumn>
        </InnerWrapper>
      </ModalBody>
    </JustifyBetweenColumn>
  )
}

export default ConfirmModal
