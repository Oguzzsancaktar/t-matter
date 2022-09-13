import React, { useRef } from 'react'
import { ICustomer, Invoice } from '@/models'
import { useGetCompanyInfoQuery } from '@services/settings/company-info/companyInfoService'
import {
  Button,
  H1,
  IconButton,
  ItemContainer,
  JustifyBetweenColumn,
  JustifyBetweenRow,
  JustifyCenterColumn
} from '@/components'
import { useGetCustomerByIdQuery } from '@services/customers/customerService'
import styled from 'styled-components'
import { useReactToPrint } from 'react-to-print'
import colors from '@constants/colors'
import { Printer } from 'react-feather'

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
  width: 100%;
  @media print {
    padding: 20px 30px;
    width: 100%;
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

const InvoiceDoc: React.FC<IProps> = ({ invoice, customerId }) => {
  const { data: companyInfo } = useGetCompanyInfoQuery()
  const { data: customer } = useGetCustomerByIdQuery(customerId)
  const ref = useRef(null)

  const handlePrint = useReactToPrint({
    content: () => ref.current
  })

  return (
    <div style={{ maxHeight: 400, height: 400, overflowY: 'auto', width: '100%', overflowX: 'hidden' }}>
      <ContainerDiv ref={ref}>
        <HeadText>{companyInfo?.name}</HeadText>
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
        <JustifyBetweenColumn margin="1rem 0 0 0">
          <SubHeadText>{invoice.category.name}</SubHeadText>
          <hr style={{ width: '100%', marginTop: '0.25rem' }} />
          {invoice.tasks?.map(t => (
            <Text margin="1rem 0 0 0">- {t.name}</Text>
          ))}
          {invoice.expiredTaskSteps?.map(t => (
            <Text margin="1rem 0 0 0">
              - {t.task.name}: Step - {t.stepIndex}
            </Text>
          ))}
          <hr style={{ width: '100%', marginTop: '1rem' }} />
        </JustifyBetweenColumn>
        <JustifyBetweenRow margin="1rem 0 0 0">
          <JustifyBetweenColumn></JustifyBetweenColumn>
          <JustifyBetweenColumn>
            <Text>
              <Bold>Subtotal:</Bold> ${+Math.ceil(invoice.amount)}
            </Text>
            <Text margin="0.5rem 0 0.5rem 0">
              <Bold>discount:</Bold> ${+Math.ceil(invoice.discount)}
            </Text>
            <hr style={{ width: '100%' }} />
            <Text margin="0.5rem 0 0 0">
              <Bold>Total:</Bold> ${+Math.ceil(invoice.total)}
            </Text>
          </JustifyBetweenColumn>
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

export default InvoiceDoc
