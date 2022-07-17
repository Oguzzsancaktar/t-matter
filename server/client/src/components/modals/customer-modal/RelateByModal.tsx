import {
  H1,
  InnerWrapper,
  ItemContainer,
  JustifyBetweenColumn,
  JustifyCenterColumn,
  JustifyCenterRow,
  SelectInput
} from '@/components'
import { ConfirmCancelButtons } from '@/components/button'
import useAccessStore from '@/hooks/useAccessStore'
import { IOption, IRelativeType } from '@/models'
import { useGetRelativeTypesQuery } from '@/services/settings/company-planning/dynamicVariableService'
import { closeModal } from '@/store'
import { toastError } from '@/utils/toastUtil'
import React, { useState } from 'react'
import { ModalHeader, ModalBody } from '../types'

interface IProps {
  title: string
  onConfirm: (relativeType?: IRelativeType) => void
  modalId: string
}
const RelateByModal: React.FC<IProps> = ({ title, onConfirm, modalId }) => {
  const { data: relativeTypesData, isLoading: relativeTypesIsLoading } = useGetRelativeTypesQuery()
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const [relativeType, setRelativeType] = useState<IRelativeType>()
  const [relativeTypeError, setRelativeTypeError] = useState<boolean>(false)

  const handleCloseRelateByModal = () => {
    dispatch(closeModal(`addRelateByModal-${modalId}`))
  }

  const handleRelateByChange = (option: IOption) => {
    const selectedRelative = relativeTypesData?.find(rt => rt._id === option.value)
    if (selectedRelative) {
      setRelativeType(selectedRelative)
    }
  }

  const handleOnConfirm = () => {
    if (relativeType) {
      onConfirm(relativeType)
    } else {
      toastError('Please select relative type type not found')
      setRelativeTypeError(true)
    }
  }

  return (
    <JustifyBetweenColumn height="100%">
      <ModalHeader>
        <InnerWrapper>
          <JustifyCenterRow width="100%">
            <H1 margin="0" textAlign="center">
              {title}
            </H1>
          </JustifyCenterRow>
        </InnerWrapper>
      </ModalHeader>

      <ModalBody>
        <InnerWrapper>
          <JustifyCenterColumn height="100%" padding="2rem 0">
            <ItemContainer>
              <SelectInput
                name={'relateBy'}
                labelText="Customer Relate By"
                selectedOption={[
                  { value: relativeType?._id || '', label: relativeType?.relateFrom + ' - ' + relativeType?.relateTo }
                ]}
                options={(relativeTypesData || []).map((relativeType: IRelativeType) => ({
                  label: relativeType.relateFrom + ' ' + relativeType.relateTo,
                  value: relativeType._id
                }))}
                onChange={handleRelateByChange}
                isLoading={relativeTypesIsLoading}
                validationError={relativeTypeError}
              />
            </ItemContainer>

            <ItemContainer>
              <ConfirmCancelButtons onConfirm={() => handleOnConfirm()} onCancel={handleCloseRelateByModal} />
            </ItemContainer>
          </JustifyCenterColumn>
        </InnerWrapper>
      </ModalBody>
    </JustifyBetweenColumn>
  )
}

export default RelateByModal
