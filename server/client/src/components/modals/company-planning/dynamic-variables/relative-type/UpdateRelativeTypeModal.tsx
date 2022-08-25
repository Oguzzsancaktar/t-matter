import React, { useState } from 'react'
import { ConfirmCancelButtons } from '@/components/button'
import { InputRegular } from '@/components/input'
import { Column, JustifyBetweenColumn, JustifyCenterColumn, JustifyCenterRow, Row } from '@/components/layout'
import { H1 } from '@/components/texts'
import useAccessStore from '@/hooks/useAccessStore'
import { closeModal } from '@/store'
import { ItemContainer } from '@/components'
import { ModalHeader, ModalBody, ModalFooter } from '@/components/modals/types'
import { toastSuccess, toastWarning } from '@/utils/toastUtil'
import { isValueNull } from '@/utils/validationUtils'
import { usePatchRelativeTypeMutation } from '@/services/settings/company-planning/dynamicVariableService'
import { IRelativeType } from '@/models'
import colors from '@/constants/colors'

interface IProps {
  relativeType: IRelativeType
}

const UpdateRelativeTypeModal: React.FC<IProps> = ({ relativeType }) => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()
  const [patchRelativeType] = usePatchRelativeTypeMutation()

  const [relateType, setRelateType] = useState<Pick<IRelativeType, 'relateTo' | 'relateFrom'>>({
    relateFrom: relativeType.relateFrom,
    relateTo: relativeType.relateTo
  })

  const handleCancel = () => {
    dispatch(closeModal('updateRelativeTypeModal'))
  }

  const handleConfirm = async () => {
    if (isValueNull(relateType.relateFrom)) {
      await patchRelativeType({
        _id: relativeType._id,
        relateFrom: relateType.relateFrom,
        relateTo: relateType.relateTo
      })
      toastSuccess('RelativeType updated successfully')
      dispatch(closeModal(`updateRelativeTypeModal-${relativeType._id}`))
    } else {
      toastWarning('RelativeType relate to is required')
    }
  }

  return (
    <JustifyBetweenColumn height="100%">
      <ModalHeader>
        <ItemContainer>
          <JustifyCenterRow width="100%">
            <H1 margin="0" textAlign="center" fontWeight="700" color={colors.white.primary}>
              Update Company RelativeType
            </H1>
          </JustifyCenterRow>
        </ItemContainer>
      </ModalHeader>

      <ModalBody withModalFooter={true}>
        <ItemContainer>
          <JustifyCenterColumn height="100%" padding="2rem 0">
            <Column>
              <ItemContainer height="40px" margin="0 0 2rem 0">
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

export default UpdateRelativeTypeModal
