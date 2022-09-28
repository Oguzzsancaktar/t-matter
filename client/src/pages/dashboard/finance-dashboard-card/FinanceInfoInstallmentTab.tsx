import React from 'react'
import {
  Column,
  ItemContainer,
  JustifyBetweenRow,
  JustifyCenterColumn,
  NoTableData,
  TableSkeltonLoader
} from '@/components'
import { useGetInstallmentsQuery } from '@services/settings/finance-planning/financePlanningService'
import DataTable, { TableColumn } from 'react-data-table-component'
import { IInstallment } from '@/models'
import moment from 'moment'

const FinanceInfoInstallmentTab = () => {
  const { data, isLoading } = useGetInstallmentsQuery(undefined)

  const columns: TableColumn<IInstallment>[] = [
    {
      name: 'Payment Date',
      selector: row => moment(row.payDate).toISOString(),
      sortable: true,
      cell: data => moment(data.payDate).format('MMM/DD/YYYY')
    }
  ]

  return (
    <ItemContainer padding="1rem" height="100%">
      <JustifyBetweenRow height="200px" margin="0 0 1rem 0">
        <JustifyCenterColumn>Up Coming Chart</JustifyCenterColumn>
        <JustifyCenterColumn>Up Coming Chart</JustifyCenterColumn>
        <JustifyCenterColumn>Up Coming Chart</JustifyCenterColumn>
      </JustifyBetweenRow>
      <ItemContainer height="calc(100% - 300px)">
        {isLoading ? (
          <ItemContainer height="100%">
            <TableSkeltonLoader count={13} />
          </ItemContainer>
        ) : data && data.length > 0 ? (
          <DataTable className="data-table" fixedHeader columns={columns} data={data || []} />
        ) : (
          <NoTableData />
        )}
      </ItemContainer>
    </ItemContainer>
  )
}

export default FinanceInfoInstallmentTab
