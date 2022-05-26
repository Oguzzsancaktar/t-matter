import React, { useState } from 'react'
import { ConfirmCancelButtons } from '@/components/button'
import { InputRegular } from '@/components/input'
import { JustifyBetweenColumn, JustifyCenterColumn, JustifyCenterRow, Row } from '@/components/layout'
import { H1 } from '@/components/texts'
import useAccessStore from '@/hooks/useAccessStore'
import { closeModal } from '@/store'
import { ColorSelect, InnerWrapper } from '@/components'
import { ModalBody, ModalFooter, ModalHeader } from '../../types'

const CreateRefferedByModal = () => {
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

  const handleConfirm = () => {
    dispatch(closeModal('createRefferedByModal'))
  }
  return (
    <InnerWrapper>
      <JustifyBetweenColumn height="100%">
        <ModalHeader>
          <JustifyCenterRow width="100%">
            <H1 margin="0" textAlign="center">
              Create Reffered By
            </H1>
          </JustifyCenterRow>
        </ModalHeader>

        <ModalBody>
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
        </ModalBody>

        <ModalFooter>
          <Row>
            <ConfirmCancelButtons onCancel={handleCancel} onConfirm={handleConfirm} />
          </Row>
        </ModalFooter>
      </JustifyBetweenColumn>
    </InnerWrapper>
  )
}

export default CreateRefferedByModal
