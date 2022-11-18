import React from 'react'
import { JustifyBetweenRow, Row } from '@/components/layout'
import Button from '../Button'
import { ItemContainer } from '@/components/item-container'
import colors from '@/constants/colors'

interface IProps {
  onConfirm: () => void
  onCancel: () => void
}

const ConfirmCancelButtons: React.FC<IProps> = ({ onConfirm, onCancel }) => {
  return (
    <JustifyBetweenRow height="30px">
      <ItemContainer margin="0 0.5rem 0 0" height="100%">
        <Button color={colors.red.primary} onClick={() => onCancel()} height="100%">
          Cancel
        </Button>
      </ItemContainer>
      <ItemContainer margin="0 0 0 0.5rem" height="100%">
        <Button color={colors.blue.primary} onClick={() => onConfirm()} height="100%">
          Submit
        </Button>
      </ItemContainer>
    </JustifyBetweenRow>
  )
}

export default ConfirmCancelButtons
