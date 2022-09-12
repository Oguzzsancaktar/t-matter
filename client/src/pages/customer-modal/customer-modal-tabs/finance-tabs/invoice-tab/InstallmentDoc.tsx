import React from 'react'
import { Invoice } from '@/models'
import { useGetInstallmentsQuery } from '@services/settings/finance-planning/financePlanningService'
import { H1 } from '@/components'
import colors from '@constants/colors'

interface IProps {
  invoiceId: Invoice['_id']
}

const InstallmentDoc: React.FC<IProps> = ({ invoiceId }) => {
  const { data: installments } = useGetInstallmentsQuery(invoiceId)
  if (!installments) return <H1 color={colors.black.light}>loading</H1>
  return <div></div>
}

export default InstallmentDoc
