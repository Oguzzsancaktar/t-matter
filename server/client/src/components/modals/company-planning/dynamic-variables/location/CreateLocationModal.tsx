import React, { useState } from 'react'
import { ConfirmCancelButtons } from '@/components/button'
import { InputRegular } from '@/components/input'
import { JustifyBetweenColumn, JustifyCenterColumn, JustifyCenterRow, Row } from '@/components/layout'
import { H1 } from '@/components/texts'
import useAccessStore from '@/hooks/useAccessStore'
import { closeModal } from '@/store'
import { InnerWrapper } from '@/components'
import { ModalHeader, ModalBody, ModalFooter } from '@/components/modals/types'
import { toastSuccess, toastError } from '@/utils/toastUtil'
import { isValueNull } from '@/utils/validationUtils'
import { useCreateLocationMutation } from '@/services/settings/company-planning/dynamicVariableService'
import colors from '@/constants/colors'

const CreateLocationModal = () => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const [locationName, setLocationName] = useState('')
  const [createLocation] = useCreateLocationMutation()

  const handleCancel = () => {
    dispatch(closeModal('createLocationModal'))
  }

  const handleConfirm = async () => {
    try {
      if (isValueNull(locationName)) {
        await createLocation({ name: locationName })
        toastSuccess(`Company location ${locationName} created successfully`)
        dispatch(closeModal('createLocationModal'))
      } else {
        toastError('Please enter a name for the company location')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <JustifyBetweenColumn height="100%">
      <ModalHeader>
        <InnerWrapper>
          <JustifyCenterRow width="100%">
            <H1 margin="0" textAlign="center" fontWeight="700" color={colors.white.primary}>
              Create Company Location
            </H1>
          </JustifyCenterRow>
        </InnerWrapper>
      </ModalHeader>

      <ModalBody>
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

export default CreateLocationModal
