import React, { useState } from 'react'
import { ConfirmCancelButtons } from '@/components/button'
import { InputRegular } from '@/components/input'
import { JustifyBetweenColumn, JustifyCenterColumn, JustifyCenterRow, Row } from '@/components/layout'
import { H1 } from '@/components/texts'
import useAccessStore from '@/hooks/useAccessStore'
import { closeModal } from '@/store'
import { ItemContainer } from '@/components'
import { ModalHeader, ModalBody, ModalFooter } from '@/components/modals/types'
import { ILocation } from '@/models'
import { toastSuccess, toastWarning } from '@/utils/toastUtil'
import { isValueNull } from '@/utils/validationUtils'
import { usePatchLocationMutation } from '@/services/settings/company-planning/dynamicVariableService'
import colors from '@/constants/colors'

interface IProps {
  location: ILocation
}

const UpdateLocationModal: React.FC<IProps> = ({ location }) => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()
  const [patchLocation] = usePatchLocationMutation()

  const [locationName, setLocationName] = useState(location.name)

  const handleCancel = () => {
    dispatch(closeModal('updateLocationModal'))
  }

  const handleConfirm = async () => {
    if (isValueNull(locationName)) {
      await patchLocation({ _id: location._id, name: locationName })
      toastSuccess('Location ' + locationName + ' updated successfully')
      dispatch(closeModal(`updateLocationModal-${location._id}`))
    } else {
      toastWarning('Location name is required')
    }
  }

  return (
    <JustifyBetweenColumn height="100%">
      <ModalHeader>
        <ItemContainer>
          <JustifyCenterRow width="100%">
            <H1 margin="0" textAlign="center" fontWeight="700" color={colors.white.primary}>
              Update Company Location
            </H1>
          </JustifyCenterRow>
        </ItemContainer>
      </ModalHeader>

      <ModalBody withModalFooter={true}>
        <ItemContainer>
          <JustifyCenterColumn height="100%" padding="2rem 0">
            <Row>
              <InputRegular
                name="locationName"
                placeholder="Location Name"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocationName(e.target.value)}
                value={locationName}
                type="text"
                labelText="Location Name"
              />
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

export default UpdateLocationModal
