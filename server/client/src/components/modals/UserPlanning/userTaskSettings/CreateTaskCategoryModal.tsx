import React, { useState } from 'react'
import { ConfirmCancelButtons } from '@/components/button'
import { InputRegular } from '@/components/input'
import { JustifyBetweenColumn, JustifyCenterColumn, JustifyCenterRow, Row } from '@/components/layout'
import { H1 } from '@/components/texts'
import useAccessStore from '@/hooks/useAccessStore'
import { closeModal } from '@/store'
import { InnerWrapper } from '@/components'
import { ModalBody, ModalFooter, ModalHeader } from '../../types'

const CreateTaskCategoryModal = () => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const [taskCategory, setTaskCategory] = useState('')

  const handleCancel = () => {
    dispatch(closeModal('createTaskCategoryModal'))
  }

  const handleConfirm = () => {
    dispatch(closeModal('createTaskCategoryModal'))
  }
  return (
    <InnerWrapper>
      <JustifyBetweenColumn height="100%">
        <ModalHeader>
          <JustifyCenterRow width="100%">
            <H1 margin="0" textAlign="center">
              Create Task Category
            </H1>
          </JustifyCenterRow>
        </ModalHeader>

        <ModalBody>
          <JustifyCenterColumn height="100%" padding="2rem 0">
            <InputRegular
              name="taskCategory"
              placeholder="Enter task category..."
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTaskCategory(e.target.value)}
              value={taskCategory}
              type="text"
              labelText="Task Category"
            />
          </JustifyCenterColumn>
        </ModalBody>

        <ModalFooter>
          <Row>
            <ConfirmCancelButtons onCancel={handleCancel} onConfirm={handleConfirm} />
          </Row>
        </ModalFooter>
      </JustifyBetweenColumn>
    </InnerWrapper>
  )
}

export default CreateTaskCategoryModal
