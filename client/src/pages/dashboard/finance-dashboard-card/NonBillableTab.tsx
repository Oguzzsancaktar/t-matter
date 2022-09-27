import React from 'react'
import { useGetNonBillablePassedCustomersQuery } from '@services/settings/finance-planning/financePlanningService'
import { ItemContainer, NoTableData, TableSkeltonLoader } from '@/components'
import DataTable from 'react-data-table-component'

const NonBillableTab = () => {
  const { data, isLoading } = useGetNonBillablePassedCustomersQuery()

  const columns = [
    {
      name: 'Client Name',
      selector: row => row.firstName + ' ' + row.lastName,
      sortable: true,
      cell: data => data.firstname + ' ' + data.lastname
    }
  ]

  return (
    <ItemContainer height="calc(100% - 40px - 0.5rem)">
      {isLoading ? (
        <ItemContainer height="100%">
          <TableSkeltonLoader count={13} />
        </ItemContainer>
      ) : data && data.length > 0 ? (
        <DataTable fixedHeader columns={columns} data={data?.map(d => d.customer) || []} />
      ) : (
        <NoTableData />
      )}
    </ItemContainer>
  )
}

export default NonBillableTab
