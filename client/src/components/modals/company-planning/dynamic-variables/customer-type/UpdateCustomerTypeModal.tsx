import React, { useState } from 'react'
import { ConfirmCancelButtons } from '@/components/button'
import { InputRegular } from '@/components/input'
import { JustifyBetweenColumn, JustifyCenterColumn, JustifyCenterRow, Row } from '@/components/layout'
import { H1 } from '@/components/texts'
import useAccessStore from '@/hooks/useAccessStore'
import { closeModal } from '@/store'
import { ColorSelect, ItemContainer } from '@/components'
import { ModalHeader, ModalBody, ModalFooter } from '@/components/modals/types'
import { IColor, ICustomerType } from '@/models'
import { toastSuccess, toastWarning } from '@/utils/toastUtil'
import { isValueNull } from '@/utils/validationUtils'
import { usePatchCustomerTypeMutation } from '@/services/settings/company-planning/dynamicVariableService'
import colors from '@/constants/colors'

interface IProps {
  customerType: ICustomerType
}

const UpdateCustomerTypeModal: React.FC<IProps> = ({ customerType }) => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()
  const [patchCustomerType] = usePatchCustomerTypeMutation()

  const [customerTypeName, setCustomerTypeName] = useState(customerType.name)
  const [selectedColor, setSelectedColor] = useState(customerType.color)

  const handleColorSelect = (color: IColor) => {
    setSelectedColor(color)
  }

  const handleCancel = () => {
    dispatch(closeModal('updateCustomerTypeModal'))
  }

  const handleConfirm = async () => {
    if (isValueNull(customerTypeName)) {
      await patchCustomerType({ _id: customerType._id, color: selectedColor, name: customerTypeName })
      toastSuccess('Refered By ' + customerTypeName + ' updated successfully')
      dispatch(closeModal(`updateCustomerTypeModal-${customerType._id}`))
    } else {
      toastWarning('Refered By name is required')
    }
  }

  return (
    <JustifyBetweenColumn height="100%">
      <ModalHeader>
        <ItemContainer>
          <JustifyCenterRow width="100%">
            <H1 margin="0" textAlign="center" fontWeight="700" color={colors.white.primary}>
              Update Company CustomerType
            </H1>
          </JustifyCenterRow>
        </ItemContainer>
      </ModalHeader>

      <ModalBody withModalFooter={true}>
        <ItemContainer>
          <JustifyCenterColumn height="100%" padding="2rem 0">
            <Row>
              <InputRegular
                name="customerTypeName"
                placeholder="Enter Customer Type Name..."
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomerTypeName(e.target.value)}
                value={customerTypeName}
                type="text"
                labelText="Customer Type Name"
              />
            </Row>
            <Row margin="1rem 0 0 0">
              <ColorSelect labelText="Select Reffered Type Color" value={selectedColor} onClick={handleColorSelect} />
            </Row>
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

export default UpdateCustomerTypeModal
