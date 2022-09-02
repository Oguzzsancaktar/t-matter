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
    <JustifyBetweenRow>
      <ItemContainer margin="0 0.5rem 0 0">
        <Button color={colors.red.primary} onClick={() => onCancel()}>
          Cancel
        </Button>
      </ItemContainer>
      <ItemContainer margin="0 0 0 0.5rem">
        <Button color={colors.blue.primary} onClick={() => onConfirm()}>
          Submit
        </Button>
      </ItemContainer>
    </JustifyBetweenRow>
  )
}

export default ConfirmCancelButtons
