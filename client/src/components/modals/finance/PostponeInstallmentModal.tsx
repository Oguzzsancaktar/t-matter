import { Button, Column, DatePicker, H1, ItemContainer, JustifyBetweenColumn, JustifyCenterRow } from '@/components'
import { IInstallment, Invoice } from '@/models'
import React, { useState } from 'react'
import colors from '@constants/colors'
import { ModalHeader, ModalBody } from '@components/modals/types'

interface IProps {
  installment: IInstallment
}

const PostponeInstallmentModal: React.FC<IProps> = ({ installment }) => {
  const [state, setState] = useState(installment.payDate)
  console.log(state)
  const handlePostpone = () => {}

  return (
    <ItemContainer height="100%" overflow="hidden" borderRadius="0.3rem">
      <ModalHeader>
        <H1 margin="0" textAlign="center" fontWeight="700" color={colors.white.primary}>
          Postpone Installment
        </H1>
      </ModalHeader>
      <ModalBody height="calc(100% - 63px)" padding="0" withModalFooter={false}>
        <Column padding="1rem">
          <JustifyCenterRow margin="0 0 0.5rem 0">
            <DatePicker
              labelText="Start Date"
              placeholder="Select Start Date"
              name="startDate"
              onChange={(date: Date[], dateText: string) => {
                if (state) {
                  setState(date[0])
                }
              }}
              value={state}
            />
          </JustifyCenterRow>
        </Column>
        <JustifyBetweenColumn>
          <div />
          <Button width="100px" onClick={handlePostpone}>
            Postpone
          </Button>
        </JustifyBetweenColumn>
      </ModalBody>
    </ItemContainer>
  )
}

export default PostponeInstallmentModal
