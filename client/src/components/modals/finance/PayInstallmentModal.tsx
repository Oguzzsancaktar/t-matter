import {
  Button,
  Column,
  DatePicker,
  H1,
  InputWithIcon,
  ItemContainer,
  JustifyCenterRow,
  SelectInput
} from '@/components'
import { IInstallment, Invoice } from '@/models'
import React, { useEffect, useState } from 'react'
import colors from '@constants/colors'
import { ModalHeader, ModalBody } from '@components/modals/types'
import { usePayInstallmentMutation } from '@services/settings/finance-planning/financePlanningService'
import { DollarSign } from 'react-feather'
import moment from 'moment'
import useAccessStore from '@hooks/useAccessStore'
import { closeModal } from '@/store'
import { payrollTypeOptions } from '@constants/payrollOptions'
import { PAYMENT_METHODS, PAYMENT_OPTIONS } from '@constants/finance'

interface IProps {
  invoice: Invoice
  installment: IInstallment
}

const PayInstallment: React.FC<IProps> = ({ invoice, installment }) => {
  const [payInstallment] = usePayInstallmentMutation()
  const [state, setState] = useState({
    amount: installment.payAmount,
    paidDate: moment().toDate(),
    paidMethod: PAYMENT_METHODS.CASH
  })
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const handlePay = async () => {
    await payInstallment({
      invoiceId: invoice._id,
      installmentId: installment._id,
      amount: state.amount,
      paidDate: state.paidDate,
      paidMethod: state.paidMethod
    })
    dispatch(closeModal('payInstallment'))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setState({
      ...state,
      [name]: value
    })
  }

  return (
    <ItemContainer height="100%" overflow="hidden" borderRadius="0.3rem">
      <ModalHeader>
        <H1 margin="0" textAlign="center" fontWeight="700" color={colors.white.primary}>
          Pay Installment
        </H1>
      </ModalHeader>
      <ModalBody height="calc(100% - 63px)" padding="0" withModalFooter={false}>
        <Column padding="1rem">
          <JustifyCenterRow margin="0 0 0.5rem 0">
            <InputWithIcon
              labelText="Payment Amount"
              placeholder="Payment Amount"
              onBlur={() => console.log('blue')}
              children={<DollarSign size="16px" />}
              name="amount"
              type="number"
              onChange={handleInputChange}
              value={state.amount}
            />
          </JustifyCenterRow>
          <JustifyCenterRow margin="0 0 0.5rem 0">
            <DatePicker
              labelText="Payment Date"
              placeholder="Select Payment Date"
              name="paidDate"
              onChange={(date: Date[], dateText: string) => {
                if (state) {
                  setState({ ...state, paidDate: date[0] })
                }
              }}
              value={state.paidDate}
            />
          </JustifyCenterRow>
          <JustifyCenterRow margin="0 0 0.5rem 0">
            <SelectInput
              selectedOption={PAYMENT_OPTIONS.filter(option => option.value === state.paidMethod)}
              labelText="Payment Method"
              onChange={o => setState({ ...state, paidMethod: o.value })}
              name="paidMethod"
              options={PAYMENT_OPTIONS}
            />
          </JustifyCenterRow>
          <JustifyCenterRow margin="0 0 0.5rem 0">
            <Button onClick={handlePay}>Pay</Button>
          </JustifyCenterRow>
        </Column>
      </ModalBody>
    </ItemContainer>
  )
}

export default PayInstallment
