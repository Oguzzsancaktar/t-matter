import React, { useState } from 'react'
import { ConfirmCancelButtons } from '@/components/button'
import { JustifyBetweenColumn, JustifyBetweenRow, JustifyCenterRow, Row } from '@/components/layout'
import { H1 } from '@/components/texts'
import useAccessStore from '@/hooks/useAccessStore'
import { closeModal } from '@/store'
import { ItemContainer } from '@/components'
import { ModalHeader, ModalBody, ModalFooter } from '@/components/modals/types'
import { IColor } from '@/models'
import { toastSuccess, toastWarning } from '@/utils/toastUtil'
import { isValueNull } from '@/utils/validationUtils'
import { usePatchColorMutation } from '@/services/settings/company-planning/dynamicVariableService'
import colors from '@/constants/colors'
import { SketchPicker } from 'react-color'
import styled from 'styled-components'

interface IProps {
  color: IColor
}

const ColorShow = styled.div`
  background-color: ${({ color }) => color && color};
  width: 100px;
  height: 450px;
  max-height: 450px;
  border-radius: 0.3rem;
`

const UpdateColorModal: React.FC<IProps> = ({ color }) => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()
  const [patchColor] = usePatchColorMutation()

  const [colorUpdate, setColorUpdate] = useState(color.color)

  const handleCancel = () => {
    dispatch(closeModal('updateColorModal'))
  }

  const handleChange = clr => {
    setColorUpdate(clr.hex)
  }
  const handleConfirm = async () => {
    if (isValueNull(colorUpdate)) {
      await patchColor({ _id: color._id, color: colorUpdate })
      toastSuccess('Color ' + colorUpdate + ' updated successfully')
      dispatch(closeModal(`updateColorModal-${color._id}`))
    } else {
      toastWarning('Color name is required')
    }
  }

  return (
    <JustifyBetweenColumn height="100%">
      <ModalHeader>
        <ItemContainer>
          <JustifyCenterRow width="100%">
            <H1 margin="0" textAlign="center" fontWeight="700" color={colors.white.primary}>
              Update Company Color
            </H1>
          </JustifyCenterRow>
        </ItemContainer>
      </ModalHeader>

      <ModalBody withModalFooter={true} height="calc(100% - 63px)" padding="0 1rem">
        <JustifyBetweenRow height="auto" padding="2rem 0">
          <SketchPicker width="100%" color={colorUpdate} onChange={handleChange} />
          <ItemContainer width="120px" margin="0 0 0 1rem" height="100%">
            <ColorShow color={colorUpdate} />
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

export default UpdateColorModal
