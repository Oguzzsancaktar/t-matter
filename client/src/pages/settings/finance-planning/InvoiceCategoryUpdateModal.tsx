import React, { useState } from 'react'
import IInvoiceCategory from '@models/Entities/finance-plannin/IInvoiceCategory'
import { useUpdateInvoiceCategoryMutation } from '@services/settings/finance-planning/financePlanningService'
import useAccessStore from '@hooks/useAccessStore'
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

interface IProps {
  invoiceCategory: IInvoiceCategory
}

const InvoiceCategoryUpdateModal: React.FC<IProps> = props => {
  const { invoiceCategory } = props
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const [invoiceCategoryName, setInvoiceCategoryName] = useState(invoiceCategory.name)
  const [patchInvoiceCategory] = useUpdateInvoiceCategoryMutation()

  const handleCancel = () => {
    dispatch(closeModal(`updateInvoiceCategoryModal-${invoiceCategory._id}`))
  }

  const handleConfirm = async () => {
    if (isValueNull(invoiceCategoryName)) {
      await patchInvoiceCategory({
        _id: invoiceCategory._id,
        name: invoiceCategoryName,
        status: invoiceCategory.status
      })
      toastSuccess('Invoice Category ' + invoiceCategoryName + ' updated successfully')
      dispatch(closeModal(`updateInvoiceCategoryModal-${invoiceCategory._id}`))
    } else {
      toastWarning('Invoice Category name is required')
    }
  }
  return (
    <JustifyBetweenColumn height="100%">
      <ModalHeader>
        <ItemContainer>
          <JustifyCenterRow width="100%">
            <H1 margin="0" textAlign="center" fontWeight="700" color={colors.white.primary}>
              Update Role - {invoiceCategory.name}
            </H1>
          </JustifyCenterRow>
        </ItemContainer>
      </ModalHeader>

      <ModalBody withModalFooter={true}>
        <ItemContainer>
          <JustifyCenterColumn height="100%" padding="2rem 0">
            <InputRegular
              name="role"
              placeholder="Invoice category name..."
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInvoiceCategoryName(e.target.value)}
              value={invoiceCategoryName}
              type="text"
              labelText="Invoice category Name"
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

export default InvoiceCategoryUpdateModal
