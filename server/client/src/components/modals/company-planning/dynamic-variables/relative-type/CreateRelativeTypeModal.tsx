import React, { useState } from 'react'
import { ConfirmCancelButtons } from '@/components/button'
import { InputRegular } from '@/components/input'
import { Column, JustifyBetweenColumn, JustifyCenterColumn, JustifyCenterRow, Row } from '@/components/layout'
import { H1 } from '@/components/texts'
import useAccessStore from '@/hooks/useAccessStore'
import { closeModal } from '@/store'
import { ItemContainer } from '@/components'
import { ModalBody, ModalFooter, ModalHeader } from '../../../types'
import { IRelativeType } from '@/models'
import { useCreateRelativeTypeMutation } from '@/services/settings/company-planning/dynamicVariableService'
import { toastSuccess, toastError } from '@/utils/toastUtil'
import { isValueNull } from '@/utils/validationUtils'
import colors from '@/constants/colors'

const CreateRelativeTypeModal = () => {
  const [createRelativeType] = useCreateRelativeTypeMutation()

  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const [relateType, setRelateType] = useState<Pick<IRelativeType, 'relateTo' | 'relateFrom'>>({
    relateFrom: '',
    relateTo: ''
  })

  const handleCancel = () => {
    dispatch(closeModal('createRelativeTypeModal'))
  }

  const handleConfirm = async () => {
    try {
      if (isValueNull(relateType.relateTo)) {
        await createRelativeType({ relateFrom: relateType.relateFrom, relateTo: relateType.relateTo })
        toastSuccess(`Company reffered by ${relateType.relateFrom} - ${relateType.relateTo} created successfully`)
        dispatch(closeModal('createRelativeTypeModal'))
      } else {
        toastError('Please enter a name for the company relative type')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <JustifyBetweenColumn height="100%">
      <ModalHeader>
        <ItemContainer>
          <JustifyCenterRow width="100%">
            <H1 margin="0" textAlign="center" fontWeight="700" color={colors.white.primary}>
              Create Relative Type
            </H1>
          </JustifyCenterRow>
        </ItemContainer>
      </ModalHeader>

      <ModalBody>
        <ItemContainer>
          <JustifyCenterColumn height="100%" padding="2rem 0">
            <Column>
              <ItemContainer margin="0 0 1rem 0">
                <InputRegular
                  name="relateFrom"
                  placeholder="Relate from"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setRelateType({ ...relateType, relateFrom: e.target.value })
                  }
                  value={relateType.relateFrom}
                  type="text"
                  labelText="Relate from"
                />
              </ItemContainer>
              <ItemContainer>
                <InputRegular
                  name="relateTo"
                  placeholder="Relate to"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setRelateType({ ...relateType, relateTo: e.target.value })
                  }
                  value={relateType.relateTo}
                  type="text"
                  labelText="Relate to"
                />
              </ItemContainer>
            </Column>
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

export default CreateRelativeTypeModal
