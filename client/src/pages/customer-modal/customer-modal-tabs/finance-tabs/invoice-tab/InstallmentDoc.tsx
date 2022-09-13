import React, { useRef } from 'react'
import { ICustomer, Invoice } from '@/models'
import {
  useGetInstallmentsQuery,
  useGetInvoicesQuery
} from '@services/settings/finance-planning/financePlanningService'
import { H1, IconButton, JustifyBetweenColumn, JustifyBetweenRow, JustifyCenterColumn } from '@/components'
import colors from '@constants/colors'
import styled from 'styled-components'
import moment from 'moment/moment'
import { Printer } from 'react-feather'
import { useReactToPrint } from 'react-to-print'
import { useGetCompanyInfoQuery } from '@services/settings/company-info/companyInfoService'
import { useGetCustomerByIdQuery } from '@services/customers/customerService'

interface IProps {
  invoice: Invoice
  customerId: ICustomer['_id']
}

const Text = styled.span<{ margin?: string }>`
  font-size: 12px;
  font-weight: 500;
  color: #000000;
  width: 100%;
  margin: ${({ margin }) => (margin ? margin : '0')};
  @media print {
    font-size: 14px;
  }
`

const HeadText = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: #000000;
  width: 100%;
  @media print {
    font-size: 18px;
  }
`

const SubHeadText = styled.span`
  font-size: 13px;
  font-weight: 900;
  color: #000000;
  width: 100%;
  @media print {
    font-size: 15px;
  }
`

const Bold = styled.span`
  font-weight: 900;
  font-size: 12px;
  color: #000000;
  width: 100%;
  @media print {
    font-size: 14px;
  }
`

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media print {
    padding: 20px 30px;
  }
`

const CompanyInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 150px;
  max-width: 150px;
  @media print {
    min-width: 200px;
    max-width: 200px;
  }
`

const InstallmentDoc: React.FC<IProps> = ({ invoice, customerId }) => {
  const { data: companyInfo } = useGetCompanyInfoQuery()
  const { data: customer } = useGetCustomerByIdQuery(customerId)

  const { data: installments } = useGetInstallmentsQuery(invoice._id)
  const ref = useRef(null)

  const handlePrint = useReactToPrint({
    content: () => ref.current
  })

  if (!installments) return <H1 color={colors.black.light}>loading</H1>

  const calculateBalance = (index: number) => {
    const slicedInstallments = installments?.slice(0, index + 1)
    const balance = slicedInstallments?.reduce(
      (acc, curr) => (acc - (curr.paidAmount ? curr.paidAmount : 0)) as number,
      +Math.ceil(invoice?.total)
    )
    return balance
  }

  const dateFormat = date => {
    return moment(date).format('MMM DD YY')
  }

  return (
    <div style={{ maxHeight: 400, height: 400, overflowY: 'auto', width: '100%', overflowX: 'hidden' }}>
      <ContainerDiv ref={ref}>
        <HeadText>Installment Plan</HeadText>
        <div
          style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}
        >
          <CompanyInfoContainer>
            <Text>
              <Bold>Adress:</Bold> {companyInfo?.address}
            </Text>
            <Text margin="0.5rem 0 0 0">
              <Bold>Phone:</Bold> {companyInfo?.phone}
            </Text>
            <Text margin="0.5rem 0 0 0">
              <Bold>Fax:</Bold> {companyInfo?.fax}
            </Text>
            <Text margin="0.5rem 0 0 0">
              <Bold>Website:</Bold> {companyInfo?.website}
            </Text>
          </CompanyInfoContainer>
          <JustifyCenterColumn width="fit-content">
            <Text>
              <Bold>Name:</Bold> {`${customer?.firstname} ${customer?.lastname}`}
            </Text>
            <Text margin="0.5rem 0 0 0">
              <Bold>Phone:</Bold> {customer?.phone}
            </Text>
            <Text margin="0.5rem 0 0 0">
              <Bold>Address:</Bold> {customer?.address ? customer?.address : 'N/A'}
            </Text>
          </JustifyCenterColumn>
        </div>
        <div
          style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', minWidth: '100%' }}>
            <Bold>{invoice.category.name}</Bold>
            <hr style={{ margin: '4px 0 12px 0' }} />
            <Text>
              <Bold>Total price:</Bold> ${+Math.ceil(invoice?.total)}
            </Text>
            <Text margin="0.5rem 0 0 0">
              <Bold>Down payment:</Bold> ${+Math.ceil(invoice?.total - calculateBalance(installments.length - 1))}
            </Text>
            <Text margin="0.5rem 0 0 0">
              <Bold>Balance:</Bold> ${calculateBalance(installments.length - 1)}
            </Text>
          </div>
        </div>
        <hr style={{ margin: '12px 0 12px 0' }} />
        <JustifyBetweenRow>
          <Bold>Pay Date</Bold>
          <Bold>Pay Amount</Bold>
          <Bold>Paid Date</Bold>
          <Bold>Paid Amount</Bold>
          <Bold>Late Fee</Bold>
          <Bold>Suspended Fee</Bold>
        </JustifyBetweenRow>
        <hr style={{ margin: '4px 0 12px 0' }} />
        {installments.map((installment, i) => {
          return (
            <JustifyBetweenRow margin="0 0 0.5rem 0" key={installment._id}>
              <Text>{dateFormat(installment.payDate)}</Text>
              <Text>${+Math.ceil(installment.payAmount)}</Text>
              <Text>{dateFormat(installment.paidDate)}</Text>
              <Text>${+Math.ceil(installment.paidAmount)}</Text>
              <Text>${+Math.ceil(installment.lateFee)}</Text>
              <Text>${+Math.ceil(installment.suspendedFee)}</Text>
            </JustifyBetweenRow>
          )
        })}
        <hr />
        <JustifyBetweenRow margin="0.5rem 0 0.5rem 0">
          <Bold>{installments.length} Months</Bold>
          <Bold></Bold>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
        </JustifyBetweenRow>
        <div className="hp" style={{ marginTop: '1rem', display: 'flex', flexDirection: 'row-reverse' }}>
          <IconButton
            width="30px"
            bgColor={colors.background.gray.light}
            onClick={handlePrint}
            children={<Printer size={16} />}
          />
        </div>
      </ContainerDiv>
    </div>
  )
}

export default InstallmentDoc
