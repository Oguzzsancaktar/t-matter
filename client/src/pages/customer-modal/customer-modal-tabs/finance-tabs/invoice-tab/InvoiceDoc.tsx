import React from 'react'
import { Invoice } from '@/models'
import { useGetCompanyInfoQuery } from '@services/settings/company-info/companyInfoService'

interface IProps {
  invoice: Invoice
}

const InvoiceDoc: React.FC<IProps> = ({ invoice }) => {
  const { data: companyInfo } = useGetCompanyInfoQuery()
  return <div></div>
}

export default InvoiceDoc
