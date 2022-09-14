import React, { useState } from 'react'
import { ConfirmCancelButtons } from '@/components/button'
import { InputRegular } from '@/components/input'
import { JustifyBetweenColumn, JustifyCenterColumn, JustifyCenterRow, Row } from '@/components/layout'
import { H1 } from '@/components/texts'
import useAccessStore from '@/hooks/useAccessStore'
import { closeModal } from '@/store'
import { ColorSelect } from '@/components'
import { ModalHeader, ModalBody, ModalFooter } from '@/components/modals/types'
import { useCreateCustomerTypeMutation } from '@/services/settings/company-planning/dynamicVariableService'
import { toastSuccess, toastError } from '@/utils/toastUtil'
import { isValueNull } from '@/utils/validationUtils'
import colors from '@/constants/colors'
import { initialColor } from '@/constants/initialValues'
import { IColor } from '@/models'

interface IProps {}

const CreateCustomerTypeModal: React.FC<IProps> = () => {
  const [createCustomerType] = useCreateCustomerTypeMutation()

  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const [selectedColor, setSelectedColor] = useState(initialColor)
  const [customerTypeName, setCustomerTypeName] = useState('')

  const handleColorSelect = (color: IColor) => {
    setSelectedColor(color)
  }

  const handleCancel = () => {
    dispatch(closeModal('createCustomerTypeModal'))
  }

  const handleConfirm = async () => {
    try {
      if (isValueNull(customerTypeName) && selectedColor !== initialColor) {
        await createCustomerType({ name: customerTypeName, color: selectedColor })
        toastSuccess(`Company reffered by ${customerTypeName} created successfully`)
        dispatch(closeModal('createCustomerTypeModal'))
      } else {
        toastError('Please enter input values !')
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
            Create Customer Type
          </H1>
        </JustifyCenterRow>
      </ModalHeader>

      <ModalBody backgroundColor={colors.white.secondary} withModalFooter={true}>
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
      </ModalBody>

      <ModalFooter>
        <Row>
          <ConfirmCancelButtons onCancel={handleCancel} onConfirm={handleConfirm} />
        </Row>
      </ModalFooter>
    </JustifyBetweenColumn>
  )
}

export default CreateCustomerTypeModal
