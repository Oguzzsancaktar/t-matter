import React from 'react'
import { Invoice } from '@/models'
import { useGetCompanyInfoQuery } from '@services/settings/company-info/companyInfoService'
import { H1, ItemContainer } from '@/components'

interface IProps {
  invoice: Invoice
}

const InvoiceDoc: React.FC<IProps> = ({ invoice }) => {
  const { data: companyInfo } = useGetCompanyInfoQuery()
  return (
    <ItemContainer>
      <H1>{companyInfo?.name}</H1>
    </ItemContainer>
  )
}

export default InvoiceDoc
