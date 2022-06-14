import { ConfirmCancelButtons } from '@/components/button'
import { InputRegular } from '@/components/input'
import { JustifyBetweenColumn, JustifyCenterRow, JustifyCenterColumn, Row } from '@/components/layout'
import { H1 } from '@/components/texts'
import { InnerWrapper } from '@/components/wrapper'
import useAccessStore from '@/hooks/useAccessStore'
import { useCreateCategoryMutation } from '@/services/settings/workflow-planning/workflowPlanService'
import { closeModal } from '@/store'
import { toastError, toastSuccess } from '@/utils/toastUtil'
import { isValueNull } from '@/utils/validationUtils'
import React, { useState } from 'react'
import { ModalHeader, ModalBody, ModalFooter } from '../../types'

const CreateWorkflowCategoryModal = () => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const [createCategory, { data: createCategoryData, isLoading: createCategoryLoading, error: createCategoryError }] =
    useCreateCategoryMutation()

  const [workflowCategoryName, setWorkflowCategoryName] = useState('')

  const handleCancel = () => {
    dispatch(closeModal('createWorkflowCategoryModal'))
  }

  const handleConfirm = async () => {
    try {
      if (isValueNull(workflowCategoryName)) {
        await createCategory({ name: workflowCategoryName })
        toastSuccess(`Workflow category ${workflowCategoryName} created successfully`)
        dispatch(closeModal('createWorkflowCategoryModal'))
      } else {
        toastError('Please enter a name for the workflow category')
      }
    } catch (error) {
      console.log(error)
    }
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
              name="workflowCategoryName"
              placeholder="Enter workflow category..."
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWorkflowCategoryName(e.target.value)}
              value={workflowCategoryName}
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
