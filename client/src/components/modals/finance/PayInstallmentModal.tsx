import { H1, ItemContainer } from '@/components'
import { Invoice } from '@/models'
import React from 'react'
import colors from '@constants/colors'
import { ModalHeader, ModalBody } from '@components/modals/types'

interface IProps {
  invoice: Invoice
}

const PayInstallment: React.FC<IProps> = ({ invoice }) => {
  return (
    <ItemContainer height="100%" overflow="hidden" borderRadius="0.3rem">
      <ModalHeader>
        <H1 margin="0" textAlign="center" fontWeight="700" color={colors.white.primary}>
          Pay Installment
        </H1>
      </ModalHeader>
      <ModalBody height="calc(100% - 63px)" padding="0" withModalFooter={false}>
        Under Construction
      </ModalBody>
    </ItemContainer>
  )
}

export default PayInstallment
