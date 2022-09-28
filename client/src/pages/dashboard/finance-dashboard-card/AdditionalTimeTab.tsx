import React from 'react'
import { useGetAdditionalTimePassedCustomersQuery } from '@services/settings/finance-planning/financePlanningService'
import { ItemContainer, NoTableData, TableSkeltonLoader } from '@/components'
import DataTable from 'react-data-table-component'

const AdditionalTimeTab = () => {
  const { data, isLoading } = useGetAdditionalTimePassedCustomersQuery()

  const columns = [
    {
      name: 'Client Name',
      selector: row => row.firstName + ' ' + row.lastName,
      sortable: true,
      cell: data => data.firstname + ' ' + data.lastname
    }
  ]

  return (
    <ItemContainer padding="1rem" height="100%">
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

export default AdditionalTimeTab
