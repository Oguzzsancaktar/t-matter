import { ConfirmCancelButtons } from '@/components/button'
import { ColorSelect } from '@/components/color-select'
import { InputRegular } from '@/components/input'
import { ItemContainer } from '@/components/item-container'
import { JustifyBetweenColumn, JustifyCenterRow, JustifyCenterColumn, Row } from '@/components/layout'
import { H1 } from '@/components/texts'
import colors from '@/constants/colors'
import useAccessStore from '@/hooks/useAccessStore'
import { EStatus, IColor } from '@/models'
import { useCreateCategoryMutation } from '@/services/settings/workflow-planning/workflowService'
import { closeModal } from '@/store'
import { toastError, toastSuccess } from '@/utils/toastUtil'
import { isValueNull } from '@/utils/validationUtils'
import React, { useState } from 'react'
import { ModalHeader, ModalBody, ModalFooter } from '../../types'

const CreateWorkflowCategoryModal = () => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const [createCategory] = useCreateCategoryMutation()

  const [workflowCategoryName, setWorkflowCategoryName] = useState('')

  const [workflowCategoryColor, setWorkflowCategoryColor] = useState<IColor>({
    _id: '',
    color: '',
    status: EStatus.Active
  })

  const handleColorChange = (color: IColor) => {
    setWorkflowCategoryColor(color)
  }

  const handleCancel = () => {
    dispatch(closeModal('createWorkflowCategoryModal'))
  }

  const handleConfirm = async () => {
    try {
      if (isValueNull(workflowCategoryName)) {
        await createCategory({ name: workflowCategoryName, color: workflowCategoryColor._id })
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
        <JustifyCenterRow width="100%">
          <H1 margin="0" textAlign="center" fontWeight="700" color={colors.white.primary}>
            Create Workflow Category
          </H1>
        </JustifyCenterRow>
      </ModalHeader>

      <ModalBody withModalFooter={true} padding="1rem">
        <JustifyCenterColumn height="100%">
          <InputRegular
            name="workflowCategoryName"
            placeholder="Enter workflow category..."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWorkflowCategoryName(e.target.value)}
            value={workflowCategoryName}
            type="text"
            labelText="Workflow Category"
          />

          <ItemContainer margin="1rem 0 0 0 ">
            <ColorSelect labelText="Category Color" value={workflowCategoryColor} onClick={handleColorChange} />
          </ItemContainer>
        </JustifyCenterColumn>
      </ModalBody>

      <ModalFooter>
        <Row>
          <ConfirmCancelButtons onCancel={handleCancel} onConfirm={handleConfirm} />
        </Row>
      </ModalFooter>
    </JustifyBetweenColumn>
  )
}

export default CreateWorkflowCategoryModal
