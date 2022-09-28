import React, { useState } from 'react'
import {
  Button,
  Column,
  DatePicker,
  IconButton,
  InstallmentPrintModal,
  ItemContainer,
  JustifyBetweenRow,
  JustifyCenterColumn,
  NoTableData,
  Row,
  TableSkeltonLoader,
  TaskNoteCounter
} from '@/components'
import { useGetInstallmentsQuery } from '@services/settings/finance-planning/financePlanningService'
import DataTable, { TableColumn } from 'react-data-table-component'
import { IInstallment } from '@/models'
import moment from 'moment'
import { INSTALLMENT_STATUS } from '@constants/finance'
import colors from '@constants/colors'
import constantToLabel from '@utils/constantToLabel'

const FinanceInfoInstallmentTab = () => {
  const { data, isLoading } = useGetInstallmentsQuery(undefined)
  const [dateRange, setDateRange] = useState({
    startDate: moment().subtract(1, 'year').toDate(),
    endDate: moment().toDate()
  })

  const columns: TableColumn<IInstallment>[] = [
    {
      name: 'Payment Date',
      selector: row => moment(row.payDate).toISOString(),
      sortable: true,
      cell: d => moment(d.payDate).format('MMM/DD/YYYY')
    },
    {
      name: 'Customer',
      selector: row => row.invoice.customer.firstname + ' ' + row.invoice.customer.lastname,
      sortable: true,
      cell: d => d.invoice.customer.firstname + ' ' + d.invoice.customer.lastname
    },
    {
      name: 'Invoice category',
      selector: row => row.invoice.category.name,
      sortable: true,
      cell: d => d.invoice.category.name
    },
    {
      name: 'Payment',
      selector: row => '$' + row.payAmount,
      sortable: true,
      cell: d => d.payAmount
    },
    {
      name: 'Status',
      selector: row => row.status,
      sortable: true,
      cell: d => (
        <div
          style={{
            background:
              d.status === INSTALLMENT_STATUS.PAID
                ? colors.green.primary
                : d.status === INSTALLMENT_STATUS.LESS_PAID
                ? colors.orange.primary
                : colors.red.primary,
            borderRadius: 5,
            padding: 5,
            color: 'white',
            textAlign: 'center'
          }}
        >
          {constantToLabel(d.status)}
        </div>
      )
    }
  ]

  return (
    <ItemContainer padding="1rem" height="100%">
      <JustifyBetweenRow height="200px" margin="0 0 1rem 0">
        <JustifyCenterColumn>Up Coming Chart</JustifyCenterColumn>
        <JustifyCenterColumn>Up Coming Chart</JustifyCenterColumn>
        <JustifyCenterColumn>Up Coming Chart</JustifyCenterColumn>
      </JustifyBetweenRow>
      <JustifyBetweenRow height="65px" margin="0 0 0.5rem 0">
        <JustifyBetweenRow width="300px">
          <div style={{ marginRight: 8 }}>
            <DatePicker
              labelText="Start Date"
              name="startDate"
              onChange={(date: Date[]) => setDateRange({ startDate: date[0], endDate: dateRange.endDate })}
              value={dateRange.startDate}
            />
          </div>
          <div>
            <DatePicker
              labelText="End Date"
              name="endDate"
              onChange={(date: Date[]) => setDateRange({ endDate: date[0], startDate: dateRange.startDate })}
              value={dateRange.endDate}
            />
          </div>
        </JustifyBetweenRow>
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
