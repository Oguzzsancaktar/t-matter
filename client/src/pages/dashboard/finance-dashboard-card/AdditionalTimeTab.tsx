import React, { useEffect, useState } from 'react'
import {
  useGetAdditionalTimePassedCustomersQuery,
  useGetFinancePlanningQuery
} from '@services/settings/finance-planning/financePlanningService'
import { ItemContainer, NoTableData, ReadCustomerModal, TableSkeltonLoader } from '@/components'
import DataTable, { TableColumn } from 'react-data-table-component'
import { ESize, ICustomer } from '@/models'
import moment from 'moment/moment'
import { openModal } from '@/store'
import useAccessStore from '@hooks/useAccessStore'

const AdditionalTimeTab = () => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const { data, isLoading } = useGetAdditionalTimePassedCustomersQuery()
  const { data: financePlanning } = useGetFinancePlanningQuery()
  const [columns, setColumns] = useState<TableColumn<ICustomer>[]>([
    {
      name: 'Client Name',
      selector: row => row.firstname + ' ' + row.lastname,
      sortable: true,
      cell: data => data.firstname + ' ' + data.lastname
    },
    {
      name: 'Category',
      selector: row => moment(row.createdAt).toISOString(),
      sortable: true,
      cell: d => 'Additional Time'
    },
    {
      name: 'Percentage',
      selector: (row, i) => 1,
      sortable: true,
      cell: (d, i) => 'loading...'
    }
  ])

  useEffect(() => {
    if (data && financePlanning) {
      const newColumns = [...columns]
      newColumns[2].selector = row => {
        return data.find(x => x.customer._id === row._id)?.total || 0
      }
      newColumns[2].cell = (d, i) => {
        const total = data.find(x => x.customer._id === d._id)?.total || 0
        return '% ' + Math.ceil((total / financePlanning.inactiveTimeSlipAmount.value) * 100)
      }
      setColumns(newColumns)
    }
  }, [data, financePlanning])

  const handleRowClicked = (customer: ICustomer) => {
    dispatch(
      openModal({
        id: `customerDetailModal-${customer._id}`,
        title: 'Customer / ' + customer.firstname + ' ' + customer.lastname,
        body: <ReadCustomerModal defaultActiveTab="finance" customer={customer} />,
        width: ESize.WXLarge,
        height: `calc(${ESize.HLarge} - 2rem )`,
        backgroundColor: 'transparent'
      })
    )
  }

  return (
    <ItemContainer padding="1rem" height="100%">
      {isLoading ? (
        <ItemContainer height="100%">
          <TableSkeltonLoader count={13} />
        </ItemContainer>
      ) : data && data.length > 0 ? (
        <DataTable
          className="data-table"
          fixedHeader
          columns={columns}
          data={data?.map(d => d.customer) || []}
          onRowClicked={handleRowClicked}
        />
      ) : (
        <NoTableData />
      )}
    </ItemContainer>
  )
}

export default AdditionalTimeTab
