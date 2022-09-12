import React, { useRef } from 'react'
import { Invoice } from '@/models'
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

interface IProps {
  invoice: Invoice
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

const InstallmentDoc: React.FC<IProps> = ({ invoice }) => {
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
    <div style={{ maxHeight: 400, height: 400, overflowY: 'auto', width: '100%' }}>
      <ContainerDiv ref={ref}>
        <HeadText>Installment Plan</HeadText>
        <div
          style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', minWidth: '300px' }}>
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
          <JustifyCenterColumn></JustifyCenterColumn>
        </div>
        <hr style={{ margin: '12px 0 12px 0' }} />
        <JustifyBetweenRow>
          <Bold>Pay Date</Bold>
          <Bold>Pay Amount</Bold>
          <Bold>Paid Date</Bold>
          <Bold>Paid Amount</Bold>
          <Bold>Late Fee</Bold>
          <Bold>Suspended Fee</Bold>
          <Bold>Balance</Bold>
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
              <Text>${calculateBalance(i)}</Text>
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
          <Text>${calculateBalance(installments.length - 1)}</Text>
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
