import React from 'react'
import { JustifyBetweenRow, Row } from '@/components/layout'
import Button from '../Button'

interface IProps {
  onConfirm: () => void
  onCancel: () => void
}

const ConfirmCancelButtons: React.FC<IProps> = ({ onConfirm, onCancel }) => {
  return (
    <JustifyBetweenRow>
      <Row margin="0 0.5rem 0 0">
        <Button onClick={() => onConfirm()}>Submit</Button>
      </Row>

      <Row margin="0 0 0 0.5rem">
        <Button onClick={() => onCancel()}>Cancel</Button>
      </Row>
    </JustifyBetweenRow>
  )
}

export default ConfirmCancelButtons
