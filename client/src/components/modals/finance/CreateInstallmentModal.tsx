import React, { useEffect, useState } from 'react'
import {
  Button,
  Column,
  DatePicker,
  H1,
  InputWithIcon,
  ItemContainer,
  JustifyBetweenColumn,
  JustifyCenterRow
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

interface IProps {
  invoice: Invoice
}

const CreateInstallmentModal: React.FC<IProps> = ({ invoice }) => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const [createInstallment] = useCreateInstallmentMutation()
  const { data: financePlanning } = useGetFinancePlanningQuery()

  const [state, setState] = useState<IInstallmentCreateDTO>()

  useEffect(() => {
    if (financePlanning) {
      const deposit = +Number((invoice.total * financePlanning.minDepositAmount.value) / 100).toFixed(0)
      const totalPayment = invoice.total - deposit
      setState({
        invoiceId: invoice._id as string,
        startDate: moment().add(1, 'months').toDate(),
        deposit,
        payAmount: +Math.ceil(totalPayment),
        quantity: 1
      })
    }
  }, [financePlanning])

  useEffect(() => {
    if (state) {
      const totalPayment = invoice.total - state.deposit
      const payAmount = +Math.ceil(totalPayment / state.quantity)
      setState({ ...state, payAmount, quantity: +state.quantity })
    }
  }, [state?.deposit, state?.quantity])

  const handleCreate = () => {
    if (state) {
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
            />
          </JustifyCenterRow>
          <JustifyCenterRow margin="0 0 0.5rem 0">
            <InputWithIcon
              labelText="Quantity"
              placeholder="Quantity"
              onBlur={() => console.log('blue')}
              children={<DollarSign size="16px" />}
              name="quantity"
              type="number"
              value={state?.quantity}
              onChange={handleInputChange}
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
