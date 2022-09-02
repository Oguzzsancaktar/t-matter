import React, { useState } from 'react'
import useAccessStore from '@hooks/useAccessStore'
import { useCreateRoleMutation } from '@services/settings/user-planning/userRoleService'
import { closeModal } from '@/store'
import { isValueNull } from '@utils/validationUtils'
import { toastSuccess, toastWarning } from '@utils/toastUtil'
import {
  ConfirmCancelButtons,
  H1,
  InputRegular,
  ItemContainer,
  JustifyBetweenColumn,
  JustifyCenterColumn,
  JustifyCenterRow,
  Row
} from '@/components'
import { ModalBody, ModalFooter, ModalHeader } from '@components/modals/types'
import colors from '@constants/colors'
import { useCreateInvoiceCategoryMutation } from '@services/settings/finance-planning/financePlanningService'
import { EStatus } from '@/models'

interface IProps {}

const InvoiceCategoryCreateModal: React.FC<IProps> = props => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const [invoiceCategoryName, setInvoiceCategoryName] = useState('')
  const [createInvoiceCategory] = useCreateInvoiceCategoryMutation()

  const handleCancel = () => {
    dispatch(closeModal('createInvoiceCategoryModal'))
  }

  const handleConfirm = async () => {
    if (isValueNull(invoiceCategoryName)) {
      await createInvoiceCategory({ name: invoiceCategoryName, status: EStatus.Active })
      toastSuccess('Invoice Category  ' + invoiceCategoryName + ' created successfully')
      dispatch(closeModal('createInvoiceCategoryModal'))
    } else {
      toastWarning('Invoice Category is required')
    }
  }

  return (
    <JustifyBetweenColumn height="100%">
      <ModalHeader>
        <ItemContainer>
          <JustifyCenterRow width="100%">
            <H1 margin="0" textAlign="center" fontWeight="700" color={colors.white.primary}>
              Create Invoice Category
            </H1>
          </JustifyCenterRow>
        </ItemContainer>
      </ModalHeader>

      <ModalBody withModalFooter={true}>
        <ItemContainer>
          <JustifyCenterColumn height="100%" padding="2rem 0">
            <InputRegular
              name="invoiceCategory"
              placeholder="Enter invoce category..."
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInvoiceCategoryName(e.target.value)}
              value={invoiceCategoryName}
              type="text"
              labelText="Invoice Category Name"
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

export default InvoiceCategoryCreateModal
