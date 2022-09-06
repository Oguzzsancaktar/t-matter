import { Button, Column, DatePicker, H1, ItemContainer, JustifyBetweenColumn, JustifyCenterRow } from '@/components'
import { IInstallment, Invoice } from '@/models'
import React, { useState } from 'react'
import colors from '@constants/colors'
import { ModalHeader, ModalBody } from '@components/modals/types'
import {
  useGetFinancePlanningQuery,
  usePostponeInstallmentMutation
} from '@services/settings/finance-planning/financePlanningService'
import useAccessStore from '@hooks/useAccessStore'
import { closeModal } from '@/store'
import moment from 'moment'

interface IProps {
  installment: IInstallment
  selectedInvoice: Invoice
  setSelectedInvoice: React.Dispatch<React.SetStateAction<Invoice | undefined>>
}

const PostponeInstallmentModal: React.FC<IProps> = ({ installment, selectedInvoice, setSelectedInvoice }) => {
  const [state, setState] = useState(installment.payDate)
  const [postponeInstallment] = usePostponeInstallmentMutation()
  const { data: financePlanning, isLoading: isFinancePlanningLoading } = useGetFinancePlanningQuery()
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const handlePostpone = async () => {
    await postponeInstallment({
      invoiceId: selectedInvoice._id,
      oldDate: installment.payDate,
      days: moment(state).diff(moment(installment.payDate), 'days') + 1
    })
    setSelectedInvoice({ ...selectedInvoice, postponeCount: selectedInvoice.postponeCount + 1 })
    dispatch(closeModal('postponeInstallment'))
  }

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
              minDate={moment(installment.payDate).valueOf()}
              maxDate={moment(installment.payDate)
                .add(financePlanning?.installmentPostponeTimeLimit.value, 'days')
                .valueOf()}
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
