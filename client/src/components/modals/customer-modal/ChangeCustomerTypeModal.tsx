import {
  H1,
  ItemContainer,
  JustifyBetweenColumn,
  JustifyCenterColumn,
  JustifyCenterRow,
  SelectInput
} from '@/components'
import { ConfirmCancelButtons } from '@/components/button'
import colors from '@/constants/colors'
import { emptyQueryParams } from '@/constants/queryParams'
import useAccessStore from '@/hooks/useAccessStore'
import { IOption } from '@/models'
import { useGetCustomerTypesQuery } from '@/services/settings/company-planning/dynamicVariableService'
import { closeModal } from '@/store'
import React, { useMemo, useState } from 'react'
import { ModalHeader, ModalBody } from '../types'

interface IProps {
  title: string
  onConfirm: (customerType: string) => void
  modalId: string
}
const ChangeCustomerTypeModal: React.FC<IProps> = ({ title, onConfirm, modalId }) => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const [customerType, setCustomerType] = useState<IOption>()

  const { data: customerTypeData, isLoading: customerTypeIsLoading } = useGetCustomerTypesQuery(emptyQueryParams)

  console.log('customerType', customerType)

  const customerTypeOptions = useMemo(() => {
    if (customerTypeData) {
      return [{ value: '-9', label: 'All' }].concat(
        customerTypeData.map(customerType => ({
          label: customerType.name,
          value: customerType._id,
          color: customerType.color
        }))
      )
    }
    return [{ value: '-9', label: 'All' }]
  }, [customerTypeData])

  const handleCustomerTypeChange = (status: IOption) => {
    setCustomerType(status)
  }

  const handleCloseReactiveModal = () => {
    dispatch(closeModal(`changeCustomerType-${modalId}`))
  }

  return (
    <JustifyBetweenColumn height="100%">
      <ModalHeader>
        <ItemContainer>
          <JustifyCenterRow width="100%">
            <H1 margin="0" textAlign="center" fontWeight="700" color={colors.white.primary}>
              {title}
            </H1>
          </JustifyCenterRow>
        </ItemContainer>
      </ModalHeader>

      <ModalBody>
        <ItemContainer>
          <JustifyCenterColumn height="100%" padding="2rem 0">
            <ItemContainer margin="0 0 1rem 0">
              <SelectInput
                name="customerType"
                onChange={handleCustomerTypeChange}
                selectedOption={[customerType || { value: '-9', label: 'All' }]}
                options={customerTypeOptions}
              />
            </ItemContainer>
            <ConfirmCancelButtons
              onConfirm={() => onConfirm(customerType?.value || '')}
              onCancel={handleCloseReactiveModal}
            />
          </JustifyCenterColumn>
        </ItemContainer>
      </ModalBody>
    </JustifyBetweenColumn>
  )
}

export default ChangeCustomerTypeModal
