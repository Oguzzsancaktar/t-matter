import React, { useEffect, useMemo, useState } from 'react'
import {
  Button,
  Column,
  DatePicker,
  H1,
  InputWithIcon,
  ItemContainer,
  JustifyBetweenColumn,
  JustifyCenterRow,
  TextArea
} from '@/components'
import colors from '@constants/colors'
import { ModalHeader, ModalBody } from '@components/modals/types'
import {
  useCreateInstallmentMutation,
  useGetFinancePlanningQuery
} from '@services/settings/finance-planning/financePlanningService'
import { IInstallmentCreateDTO, Invoice } from '@/models'
import moment from 'moment'
import { DollarSign } from 'react-feather'
import useAccessStore from '@hooks/useAccessStore'
import { closeModal } from '@/store'
import { toastError } from '@utils/toastUtil'
import { isFloat } from '@utils/numberUtils'

interface IProps {
  invoice: Invoice
}

const CreateInstallmentModal: React.FC<IProps> = ({ invoice }) => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const [createInstallment] = useCreateInstallmentMutation()
  const { data: financePlanning } = useGetFinancePlanningQuery()

  const [state, setState] = useState<IInstallmentCreateDTO>()

  const { deposit, totalPayment, quantity, payAmount } = useMemo(() => {
    if (financePlanning) {
      const deposit = +Math.ceil((invoice.total * financePlanning.minDepositAmount.value) / 100)
      const totalPayment = invoice.total - deposit
      const quantity = totalPayment / financePlanning.minInstallmentAmount.value
      const payAmount = +Math.ceil(totalPayment / quantity)
      return {
        deposit,
        totalPayment,
        quantity,
        payAmount
      }
    }
    return {}
  }, [financePlanning])

  useEffect(() => {
    if (financePlanning && deposit && totalPayment && quantity && payAmount) {
      if (totalPayment <= financePlanning.minInstallmentAmount.value) {
        setState({
          invoiceId: invoice._id as string,
          startDate: moment().add(1, 'months').toDate(),
          deposit: 0,
          payAmount: +Math.ceil(invoice.total),
          quantity: 1
        })
        return
      }
      setState({
        invoiceId: invoice._id as string,
        startDate: moment().add(1, 'months').toDate(),
        deposit,
        payAmount,
        quantity
      })
    }
  }, [financePlanning])

  const handleCreate = () => {
    if (state && financePlanning) {
      const deposit = +Math.ceil((invoice.total * financePlanning.minDepositAmount.value) / 100)
      const totalPayment = invoice.total - deposit
      if (totalPayment <= financePlanning.minInstallmentAmount.value) {
        createInstallment({
          invoiceId: state.invoiceId,
          startDate: state.startDate,
          deposit: 0,
          payAmount: +Math.ceil(invoice.total),
          quantity: 1,
          note: state.note
        })
        dispatch(closeModal('createInstallment'))
        return
      }
      if (
        state.payAmount < financePlanning.minInstallmentAmount.value ||
        state.deposit < +Math.ceil((invoice.total * financePlanning.minDepositAmount.value) / 100)
      ) {
        toastError('Pay amount or deposit is less than minimum amount')
        return
      }
      createInstallment(state)
      dispatch(closeModal('createInstallment'))
    }
  }

  const handleInputChange = e => {
    if (state) {
      setState({ ...state, [e.target.name]: e.target.value })
    }
  }

  return (
    <ItemContainer height="100%" overflow="hidden" borderRadius="0.3rem">
      <ModalHeader>
        <H1 margin="0" textAlign="center" fontWeight="700" color={colors.white.primary}>
          Create Installment
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
                  setState({ ...state, startDate: date[0] })
                }
              }}
              value={state?.startDate.toDateString()}
            />
          </JustifyCenterRow>
          <JustifyCenterRow margin="0 0 0.5rem 0">
            <InputWithIcon
              labelText="Deposit"
              placeholder="Deposit"
              onBlur={() => console.log('blue')}
              children={<DollarSign size="16px" />}
              name="deposit"
              type="number"
              value={state?.deposit}
              step="50"
              onChange={e => {
                if (!state) {
                  return
                }
                const d = +e.target.value
                // UP -> effect to quantity
                if (d >= (deposit as number)) {
                  const quantity = (invoice.total - d) / (state?.payAmount as number)
                  if (quantity < 1) {
                    setState({ ...state, deposit: d, quantity: 1, payAmount: Math.ceil(invoice.total - d) })
                    return
                  }
                  setState({ ...state, deposit: d, quantity })
                } else {
                  toastError('Deposit amount is less than minimum amount')
                }
              }}
            />
          </JustifyCenterRow>
          <JustifyCenterRow margin="0 0 0.5rem 0">
            <InputWithIcon
              disabled
              labelText="Pay amount"
              placeholder="Pay amount"
              onBlur={() => console.log('blue')}
              children={<DollarSign size="16px" />}
              name="payAmount"
              type="number"
              value={state?.payAmount}
            />
          </JustifyCenterRow>
          <JustifyCenterRow margin="0 0 0.5rem 0">
            <InputWithIcon
              labelText="Quantity"
              placeholder="Quantity"
              onBlur={() => console.log('blue')}
              // children={<DollarSign size="16px" />}
              name="quantity"
              type="number"
              value={state?.quantity}
              onChange={e => {
                if (!state || !financePlanning || !quantity) {
                  return
                }
                const q = +e.target.value
                // UP
                if (q > state.quantity) {
                  if (state?.payAmount <= financePlanning?.minInstallmentAmount.value) {
                    toastError('Pay amount is less than minimum amount')
                    return
                  }
                  const qty = isFloat(state.quantity) ? Math.ceil(state.quantity) : Math.ceil(q)
                  const payAmount = +Math.ceil((invoice.total - state.deposit) / qty)
                  if (payAmount < financePlanning?.minInstallmentAmount.value) {
                    setState({
                      ...state,
                      quantity: (invoice.total - state.deposit) / financePlanning?.minInstallmentAmount.value,
                      payAmount: financePlanning?.minInstallmentAmount.value
                    })
                    return
                  }
                  setState({ ...state, quantity: qty, payAmount })
                }
                // DOWN -> effect to payAmount
                if (q < state.quantity) {
                  const quantity = isFloat(state.quantity) ? Math.floor(state.quantity) : Math.floor(q)
                  const payAmount = +Math.ceil((invoice.total - state.deposit) / quantity)
                  setState({ ...state, quantity, payAmount })
                }
              }}
            />
          </JustifyCenterRow>
          <JustifyCenterRow margin="0 0 0.5rem 0">
            <TextArea
              name="note"
              labelText="Note (optional)"
              onChange={handleInputChange}
              value={state?.note}
              rows={8}
            />
          </JustifyCenterRow>
        </Column>
        <JustifyBetweenColumn>
          <div />
          <Button width="100px" onClick={handleCreate}>
            Create
          </Button>
        </JustifyBetweenColumn>
      </ModalBody>
    </ItemContainer>
  )
}

export default CreateInstallmentModal
