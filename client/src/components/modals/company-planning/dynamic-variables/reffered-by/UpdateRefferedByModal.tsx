import React, { useState } from 'react'
import { ConfirmCancelButtons } from '@/components/button'
import { InputRegular } from '@/components/input'
import { JustifyBetweenColumn, JustifyCenterColumn, JustifyCenterRow, Row } from '@/components/layout'
import { H1 } from '@/components/texts'
import useAccessStore from '@/hooks/useAccessStore'
import { closeModal } from '@/store'
import { ColorSelect, ItemContainer } from '@/components'
import { ModalHeader, ModalBody, ModalFooter } from '@/components/modals/types'
import { IColor, IRefferedBy } from '@/models'
import { toastSuccess, toastWarning } from '@/utils/toastUtil'
import { isValueNull } from '@/utils/validationUtils'
import { usePatchRefferedByMutation } from '@/services/settings/company-planning/dynamicVariableService'
import colors from '@/constants/colors'

interface IProps {
  refferedBy: IRefferedBy
}

const UpdateRefferedByModal: React.FC<IProps> = ({ refferedBy }) => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()
  const [patchRefferedBy] = usePatchRefferedByMutation()

  const [refferedByName, setRefferedByName] = useState(refferedBy.name)
  const [selectedColor, setSelectedColor] = useState(refferedBy.color)

  const handleColorSelect = (color: IColor) => {
    setSelectedColor(color)
  }

  const handleCancel = () => {
    dispatch(closeModal('updateRefferedByModal'))
  }

  const handleConfirm = async () => {
    if (isValueNull(refferedByName)) {
      await patchRefferedBy({ _id: refferedBy._id, color: selectedColor, name: refferedByName })
      toastSuccess('Refered By ' + refferedByName + ' updated successfully')
      dispatch(closeModal(`updateRefferedByModal-${refferedBy._id}`))
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
              Update Company RefferedBy
            </H1>
          </JustifyCenterRow>
        </ItemContainer>
      </ModalHeader>

      <ModalBody withModalFooter={true}>
        <ItemContainer>
          <JustifyCenterColumn height="100%" padding="2rem 0">
            <Row>
              <InputRegular
                name="refferedByName"
                placeholder="Enter Reffered By Name..."
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRefferedByName(e.target.value)}
                value={refferedByName}
                type="text"
                labelText="Reffered By Name"
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

export default UpdateRefferedByModal
