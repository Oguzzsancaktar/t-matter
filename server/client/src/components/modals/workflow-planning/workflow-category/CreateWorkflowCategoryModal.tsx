import { ConfirmCancelButtons } from '@/components/button'
import { InputRegular } from '@/components/input'
import { JustifyBetweenColumn, JustifyCenterRow, JustifyCenterColumn, Row } from '@/components/layout'
import { H1 } from '@/components/texts'
import { InnerWrapper } from '@/components/wrapper'
import useAccessStore from '@/hooks/useAccessStore'
import { closeModal } from '@/store'
import React, { useState } from 'react'
import { ModalHeader, ModalBody, ModalFooter } from '../../types'

const CreateWorkflowCategoryModal = () => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const [workflowCategory, setWorkflowCategory] = useState('')

  const handleCancel = () => {
    dispatch(closeModal('createWorkflowCategoryModal'))
  }

  const handleConfirm = () => {
    dispatch(closeModal('createWorkflowCategoryModal'))
  }
  return (
    <InnerWrapper>
      <JustifyBetweenColumn height="100%">
        <ModalHeader>
          <JustifyCenterRow width="100%">
            <H1 margin="0" textAlign="center">
              Create Workflow Category
            </H1>
          </JustifyCenterRow>
        </ModalHeader>

        <ModalBody>
          <JustifyCenterColumn height="100%" padding="2rem 0">
            <InputRegular
              name="workflowCategory"
              placeholder="Enter workflow category..."
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWorkflowCategory(e.target.value)}
              value={workflowCategory}
              type="text"
              labelText="Workflow Category"
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

export default CreateWorkflowCategoryModal
