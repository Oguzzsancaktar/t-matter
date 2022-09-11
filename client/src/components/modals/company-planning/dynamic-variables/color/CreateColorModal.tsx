import React, { useState } from 'react'
import { ConfirmCancelButtons } from '@/components/button'
import { JustifyBetweenColumn, JustifyBetweenRow, JustifyCenterRow, Row } from '@/components/layout'
import { H1 } from '@/components/texts'
import useAccessStore from '@/hooks/useAccessStore'
import { closeModal } from '@/store'
import { ItemContainer } from '@/components'
import { ModalHeader, ModalBody, ModalFooter } from '@/components/modals/types'
import { toastSuccess, toastError } from '@/utils/toastUtil'
import { isValueNull } from '@/utils/validationUtils'
import { useCreateColorMutation } from '@/services/settings/company-planning/dynamicVariableService'
import colors from '@/constants/colors'
import { SketchPicker } from 'react-color'
import styled from 'styled-components'

const ColorShow = styled.div`
  background-color: ${({ color }) => color && color};
  width: 100px;
  height: 450px;
  max-height: 450px;
  border-radius: 0.3rem;
`

const CreateColorModal = () => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const [color, setColor] = useState(colors.primary.dark)
  const [createColor] = useCreateColorMutation()

  const handleCancel = () => {
    dispatch(closeModal('createColorModal'))
  }

  const handleChange = color => {
    setColor(color.hex)
  }

  const handleConfirm = async () => {
    try {
      if (isValueNull(color)) {
        await createColor({ color: color })
        toastSuccess(`Color ${color} created successfully`)
        dispatch(closeModal('createColorModal'))
      } else {
        toastError('Please select a color')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <JustifyBetweenColumn height="100%">
      <ModalHeader>
        <JustifyCenterRow width="100%">
          <H1 margin="0" textAlign="center" fontWeight="700" color={colors.white.primary}>
            Create Company Color
          </H1>
        </JustifyCenterRow>
      </ModalHeader>

      <ModalBody withModalFooter={true} height="calc(100% - 63px)" padding="0 1rem">
        <JustifyBetweenRow height="auto" padding="2rem 0">
          <SketchPicker width="100%" color={color} onChange={handleChange} />
          <ItemContainer width="120px" margin="0 0 0 1rem" height="100%">
            <ColorShow color={color} />
          </ItemContainer>
        </JustifyBetweenRow>
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

export default CreateColorModal
