import React, { useState } from 'react'
import { ConfirmCancelButtons } from '@/components/button'
import { InputRegular } from '@/components/input'
import { JustifyBetweenColumn, JustifyCenterColumn, JustifyCenterRow, Row } from '@/components/layout'
import { H1 } from '@/components/texts'
import useAccessStore from '@/hooks/useAccessStore'
import { closeModal } from '@/store'
import { ItemContainer } from '@/components'
import { ModalBody, ModalFooter, ModalHeader } from '../../types'
import colors from '@/constants/colors'

const CreateTaskTitleModal = () => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const [taskTitle, setTaskTitle] = useState('')

  const handleCancel = () => {
    dispatch(closeModal('createTaskTitleModal'))
  }

  const handleConfirm = () => {
    dispatch(closeModal('createTaskTitleModal'))
  }
  return (
    <JustifyBetweenColumn height="100%">
      <ModalHeader>
        <ItemContainer>
          <JustifyCenterRow width="100%">
            <H1 margin="0" textAlign="center" fontWeight="700" color={colors.white.primary}>
              Create User Task Title
            </H1>
          </JustifyCenterRow>
        </ItemContainer>
      </ModalHeader>

      <ModalBody withModalFooter={true}>
        <ItemContainer>
          <JustifyCenterColumn height="100%" padding="2rem 0">
            <InputRegular
              name="taskTitle"
              placeholder="Enter task title..."
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTaskTitle(e.target.value)}
              value={taskTitle}
              type="text"
              labelText="Role Title"
            />
          </JustifyCenterColumn>
        </ItemContainer>
      </ModalBody>

      <ModalFooter>
        <ItemContainer>
          <Row>
            <ConfirmCancelButtons onCancel={handleCancel} onConfirm={handleConfirm} />
          </Row>
        </ItemContainer>
      </ModalFooter>
    </JustifyBetweenColumn>
  )
}

export default CreateTaskTitleModal
