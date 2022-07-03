import React, { useState } from 'react'
import { ConfirmCancelButtons } from '@/components/button'
import { InputRegular } from '@/components/input'
import { JustifyBetweenColumn, JustifyCenterColumn, JustifyCenterRow, Row } from '@/components/layout'
import { H1 } from '@/components/texts'
import useAccessStore from '@/hooks/useAccessStore'
import { closeModal } from '@/store'
import { ColorSelect, InnerWrapper } from '@/components'
import { ModalHeader, ModalBody, ModalFooter } from '@/components/modals/types'
import { useCreateRefferedByMutation } from '@/services/settings/company-planning/dynamicVariableService'
import { toastSuccess, toastError } from '@/utils/toastUtil'
import { isValueNull } from '@/utils/validationUtils'

interface IProps {}

const CreateRefferedByModal: React.FC<IProps> = () => {
  const [createRefferedBy] = useCreateRefferedByMutation()

  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const [selectedColor, setSelectedColor] = useState('')
  const [refferedByName, setRefferedByName] = useState('')

  const handleColorSelect = (color: string) => {
    setSelectedColor(color)
  }

  const handleCancel = () => {
    dispatch(closeModal('createRefferedByModal'))
  }

  const handleConfirm = async () => {
    try {
      if (isValueNull(refferedByName)) {
        await createRefferedBy({ name: refferedByName, color: selectedColor })
        toastSuccess(`Company reffered by ${refferedByName} created successfully`)
        dispatch(closeModal('createRefferedByModal'))
      } else {
        toastError('Please enter a name for the company reffered by')
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
            <H1 margin="0" textAlign="center">
              Create Reffered By
            </H1>
          </JustifyCenterRow>
        </InnerWrapper>
      </ModalHeader>

      <ModalBody>
        <InnerWrapper>
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

export default CreateRefferedByModal
