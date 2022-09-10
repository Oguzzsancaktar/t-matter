import React, { useRef, useState } from 'react'
import { Button, Column, H1, JustifyBetweenRow, JustifyCenterColumn, JustifyCenterRow } from '@/components'
import { ICustomer, IInstallment, Invoice } from '@/models'
import moment from 'moment/moment'
import constantToLabel from '@utils/constantToLabel'
import colors from '@constants/colors'
import { ModalHeader, ModalBody } from '@components/modals/types'
import { useGetCompanyInfoQuery } from '@services/settings/company-info/companyInfoService'
import { useGetCustomerByIdQuery } from '@services/customers/customerService'
import ReactToPrint from 'react-to-print'

const Text: React.FC<{}> = ({ children }) => {
  return (
    <H1 color={colors.black.primary} fontSize="16px">
      {children}
    </H1>
  )
}

interface IProps {
  invoice: Invoice
  installment: IInstallment
  balance?: number
  customerId: ICustomer['_id']
}

const InstallmentPrintModal: React.FC<IProps> = ({ invoice, installment, balance, customerId }) => {
  const componentRef = useRef(null)
  const { data } = useGetCompanyInfoQuery()
  const { data: customer } = useGetCustomerByIdQuery(customerId)

  return (
    <JustifyCenterColumn>
      <ModalHeader>
        <H1 margin="0" textAlign="center" fontWeight="700" color={colors.white.primary}>
          Payment Print
        </H1>
      </ModalHeader>
      <ModalBody height="calc(100% - 63px)" padding="0" withModalFooter={false}>
        <div
          style={{ display: 'flex', flexDirection: 'column', margin: 'auto', padding: '1rem', width: '80%' }}
          ref={componentRef}
        >
          <JustifyBetweenRow margin="0 0 1rem 0">
            <H1 color={colors.black.primary} fontWeight="600" fontSize="16px">
              {data?.name}
            </H1>
          </JustifyBetweenRow>
          <JustifyBetweenRow margin="0 0 1rem 0">
            <H1 color={colors.black.primary} fontWeight="600" fontSize="16px">
              {customer?.firstname + ' ' + customer?.lastname}
            </H1>
          </JustifyBetweenRow>
          <JustifyBetweenRow margin="0 0 1rem 0">
            <Text>{invoice.category.name}</Text>
          </JustifyBetweenRow>
          <JustifyBetweenRow margin="0 0 1rem 0">
            <Text>PAID DATE</Text>
            <Text>{moment(installment.paidDate).format('MMM/DD/YY')}</Text>
          </JustifyBetweenRow>
          <JustifyBetweenRow margin="0 0 1rem 0">
            <Text>PAID AMOUNT</Text>
            <Text>${installment.paidAmount}</Text>
          </JustifyBetweenRow>
          <JustifyBetweenRow margin="0 0 1rem 0">
            <Text>PAID METHOD</Text>
            <Text>{constantToLabel(installment.paidMethod as string)}</Text>
          </JustifyBetweenRow>
          <JustifyBetweenRow margin="0 0 1rem 0">
            <Text>BALANCE</Text>
            <Text>${balance}</Text>
          </JustifyBetweenRow>
          <div className="hp">
            <ReactToPrint
              trigger={() => <Button color={colors.purple.primary}>Print</Button>}
              content={() => componentRef.current}
            />
          </div>
        </div>
      </ModalBody>
    </JustifyCenterColumn>
  )
}

export default InstallmentPrintModal
