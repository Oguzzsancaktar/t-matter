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
    <JustifyBetweenColumn height="100%">
      <ModalHeader>
        <InnerWrapper>
          <JustifyCenterRow width="100%">
            <H1 margin="0" textAlign="center">
              Create Workflow Category
            </H1>
          </JustifyCenterRow>
        </InnerWrapper>
      </ModalHeader>

      <ModalBody>
        <InnerWrapper>
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
        </InnerWrapper>
      </ModalBody>

      <ModalFooter>
        <InnerWrapper>
          <Row>
            <ConfirmCancelButtons onCancel={handleCancel} onConfirm={handleConfirm} />
          </Row>
        </InnerWrapper>
      </ModalFooter>
    </JustifyBetweenColumn>
  )
}

export default CreateWorkflowCategoryModal
