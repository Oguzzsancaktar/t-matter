import React, { useState } from 'react'
import { Button, Column, H1, InputWithIcon, ItemContainer, JustifyCenterRow, SelectInput } from '@/components'
import colors from '@constants/colors'
import { ModalHeader, ModalBody } from '@components/modals/types'
import { IInstallment } from '@/models'
import { DollarSign } from 'react-feather'
import { INSTALLMENT_STATUS_OPTIONS, PAYMENT_OPTIONS } from '@constants/finance'
import useAccessStore from '@hooks/useAccessStore'
import { closeModal } from '@/store'
import { useEditInstallmentMutation } from '@services/settings/finance-planning/financePlanningService'

interface IProps {
  installment: IInstallment
}

const EditInstallmentModal: React.FC<IProps> = ({ installment }) => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()
  const [editInstallment] = useEditInstallmentMutation()
  const [state, setState] = useState<IInstallment>(installment)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setState({
      ...state,
      [name]: value
    })
  }

  const handleEdit = async () => {
    await editInstallment(state)
    dispatch(closeModal('editInstallment'))
  }

  return (
    <ItemContainer height="100%" overflow="hidden" borderRadius="0.3rem">
      <ModalHeader>
        <H1 margin="0" textAlign="center" fontWeight="700" color={colors.white.primary}>
          Edit Installment
        </H1>
      </ModalHeader>
      <ModalBody height="calc(100% - 63px)" padding="0" withModalFooter={false}>
        <Column padding="1rem">
          <JustifyCenterRow margin="0 0 0.5rem 0">
            <InputWithIcon
              labelText="Pay Amount"
              placeholder="Pay Amount"
              onBlur={() => console.log('blue')}
              children={<DollarSign size="16px" />}
              name="payAmount"
              type="number"
              onChange={e => {
                if (+e.target.value >= 0) {
                  handleInputChange(e)
                }
              }}
              value={state.payAmount}
            />
          </JustifyCenterRow>
          <JustifyCenterRow margin="0 0 0.5rem 0">
            <InputWithIcon
              labelText="Paid Amount"
              placeholder="Paid Amount"
              onBlur={() => console.log('blue')}
              children={<DollarSign size="16px" />}
              name="paidAmount"
              type="number"
              onChange={e => {
                if (+e.target.value >= 0) {
                  handleInputChange(e)
                }
              }}
              value={state.paidAmount}
            />
          </JustifyCenterRow>
          <JustifyCenterRow margin="0 0 0.5rem 0">
            <InputWithIcon
              labelText="Late Fee"
              placeholder="Late Fee"
              onBlur={() => console.log('blue')}
              children={<DollarSign size="16px" />}
              name="lateFee"
              type="number"
              onChange={e => {
                if (+e.target.value >= 0) {
                  handleInputChange(e)
                }
              }}
              value={state.lateFee}
            />
          </JustifyCenterRow>
          <JustifyCenterRow margin="0 0 0.5rem 0">
            <InputWithIcon
              labelText="Suspended Fee"
              placeholder="Suspended Fee"
              onBlur={() => console.log('blue')}
              children={<DollarSign size="16px" />}
              name="suspendedFee"
              type="number"
              onChange={e => {
                if (+e.target.value >= 0) {
                  handleInputChange(e)
                }
              }}
              value={state.suspendedFee}
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
            <SelectInput
              selectedOption={INSTALLMENT_STATUS_OPTIONS.filter(option => option.value === state.status)}
              labelText="Status"
              onChange={o => setState({ ...state, status: o.value })}
              name="status"
              options={INSTALLMENT_STATUS_OPTIONS}
            />
          </JustifyCenterRow>
          <JustifyCenterRow margin="0 0 0.5rem 0">
            <Button onClick={handleEdit}>Edit</Button>
          </JustifyCenterRow>
        </Column>
      </ModalBody>
    </ItemContainer>
  )
}

export default EditInstallmentModal
