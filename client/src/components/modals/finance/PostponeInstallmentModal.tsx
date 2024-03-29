import {
  Button,
  Column,
  DatePicker,
  H1,
  ItemContainer,
  JustifyBetweenColumn,
  JustifyCenterRow,
  TextArea
} from '@/components'
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
  setSelectedInvoice: (invoice: Invoice) => void
}

const PostponeInstallmentModal: React.FC<IProps> = ({ installment, selectedInvoice, setSelectedInvoice }) => {
  const [state, setState] = useState(installment.payDate)
  const [note, setNote] = useState('')
  const [postponeInstallment] = usePostponeInstallmentMutation()
  const { data: financePlanning, isLoading: isFinancePlanningLoading } = useGetFinancePlanningQuery()
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const handlePostpone = async () => {
    await postponeInstallment({
      invoiceId: selectedInvoice._id,
      oldDate: installment.payDate,
      days: moment(state).diff(moment(installment.payDate), 'days') + 1,
      note,
      installmentId: installment._id
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
                .add(financePlanning?.installmentpostponeLimitLimit.value, 'days')
                .valueOf()}
              value={state}
            />
          </JustifyCenterRow>
          <JustifyCenterRow margin="0 0 0.5rem 0">
            <TextArea
              name="note"
              labelText="Note (optional)"
              onChange={e => setNote(e.target.value)}
              value={note}
              rows={18}
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
