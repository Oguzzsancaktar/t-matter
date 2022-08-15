import React, { useState } from 'react'
import { ConfirmCancelButtons } from '@/components/button'
import { InputRegular } from '@/components/input'
import { JustifyBetweenColumn, JustifyCenterColumn, JustifyCenterRow, Row } from '@/components/layout'
import { H1 } from '@/components/texts'
import useAccessStore from '@/hooks/useAccessStore'
import { closeModal } from '@/store'
import { InnerWrapper } from '@/components'
import { ModalBody, ModalFooter, ModalHeader } from '../../types'
import { isValueNull } from '@/utils/validationUtils'
import { toastSuccess, toastWarning } from '@/utils/toastUtil'
import { ITaskCategory } from '@/models'
import { usePatchWorkflowCategoryMutation } from '@/services/settings/workflow-planning/workflowService'
import colors from '@/constants/colors'

interface IProps {
  category: ITaskCategory
}
const UpdateWorkflowCategoryModal: React.FC<IProps> = ({ category }) => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const [categoryName, setCategoryName] = useState(category.name)
  const [patchWorkflowCategory] = usePatchWorkflowCategoryMutation()

  const handleCancel = () => {
    dispatch(closeModal('createCategoryModal'))
  }

  const handleConfirm = async () => {
    if (isValueNull(categoryName)) {
      await patchWorkflowCategory({ _id: category._id, name: categoryName })
      toastSuccess('Category ' + categoryName + ' updated successfully')
      dispatch(closeModal(`updateWorkflowCategoryModal-${category._id}`))
    } else {
      toastWarning('Category name is required')
    }
  }
  return (
    <JustifyBetweenColumn height="100%">
      <ModalHeader>
        <InnerWrapper>
          <JustifyCenterRow width="100%">
            <H1 margin="0" textAlign="center" fontWeight="700" color={colors.white.primary}>
              Update Workflow Category
            </H1>
          </JustifyCenterRow>
        </InnerWrapper>
      </ModalHeader>

      <ModalBody>
        <InnerWrapper>
          <JustifyCenterColumn height="100%" padding="2rem 0">
            <InputRegular
              name="category"
              placeholder="Enter category..."
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCategoryName(e.target.value)}
              value={categoryName}
              type="text"
              labelText="Category Name"
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

export default UpdateWorkflowCategoryModal
