import React, { useState } from 'react'
import { ConfirmCancelButtons } from '@/components/button'
import { InputRegular } from '@/components/input'
import { JustifyBetweenColumn, JustifyCenterColumn, JustifyCenterRow, Row } from '@/components/layout'
import { H1 } from '@/components/texts'
import useAccessStore from '@/hooks/useAccessStore'
import { closeModal } from '@/store'
import { ColorSelect, InnerWrapper } from '@/components'
import { ModalHeader, ModalBody, ModalFooter } from '@/components/modals/types'
import { toastSuccess, toastWarning } from '@/utils/toastUtil'
import { isValueNull } from '@/utils/validationUtils'
import { usePatchRelativeTypeMutation } from '@/services/settings/company-planning/dynamicVariableService'
import { IRelativeType } from '@/models'

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
        <InnerWrapper>
          <JustifyCenterRow width="100%">
            <H1 margin="0" textAlign="center">
              Update Company RelativeType
            </H1>
          </JustifyCenterRow>
        </InnerWrapper>
      </ModalHeader>

      <ModalBody>
        <InnerWrapper>
          <JustifyCenterColumn height="100%" padding="2rem 0">
            <Row>
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
            </Row>
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

export default UpdateRelativeTypeModal
