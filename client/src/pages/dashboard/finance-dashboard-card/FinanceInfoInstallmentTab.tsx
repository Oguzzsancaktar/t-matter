import React, { useEffect, useState } from 'react'
import {
  DatePicker,
  FinanceInfoInstallmentBarChart,
  FinanceInfoPaidTypeDonutChart,
  ItemContainer,
  JustifyBetweenRow,
  JustifyCenterColumn,
  NoTableData,
  ReadCustomerModal,
  TableSkeltonLoader
} from '@/components'
import { useLazyGetInstallmentsQuery } from '@services/settings/finance-planning/financePlanningService'
import DataTable, { TableColumn } from 'react-data-table-component'
import { ESize, IInstallment } from '@/models'
import moment from 'moment'
import { INSTALLMENT_STATUS } from '@constants/finance'
import colors from '@constants/colors'
import constantToLabel from '@utils/constantToLabel'
import { openModal } from '@/store'
import useAccessStore from '@hooks/useAccessStore'
import FinanceInfoPaidDonutPercentage from '../../../components/charts/FinanceInfoPaidDonutPercentage'

const FinanceInfoInstallmentTab = props => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()
  const [fetch, { data, isLoading }] = useLazyGetInstallmentsQuery()
  const [dateRange, setDateRange] = useState({
    startDate: props.dateRange ? props.dateRange.startDate : moment().startOf('year').toDate(),
    endDate: props.dateRange ? props.dateRange.endDate : moment().endOf('year').toDate()
  })

  useEffect(() => {
    fetch({ ...dateRange, invoice: undefined })
  }, [dateRange])

  const columns: TableColumn<IInstallment>[] = [
    {
      name: 'Payment Date',
      selector: row => moment(row.payDate).toString(),
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
      selector: row => row.payAmount,
      sortable: true,
      cell: d => '$' + d.payAmount
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

  const handleRowClicked = (installment: IInstallment) => {
    dispatch(
      openModal({
        id: `customerDetailModal-${installment.invoice.customer._id}`,
        title: 'Customer / ' + installment.invoice.customer.firstname + ' ' + installment.invoice.customer.lastname,
        body: <ReadCustomerModal defaultActiveTab="finance" customer={installment.invoice.customer} />,
        width: ESize.WXLarge,
        height: `calc(${ESize.HLarge} - 2rem )`,
        backgroundColor: 'transparent'
      })
    )
  }

  return (
    <ItemContainer padding="1rem" height="100%">
      <JustifyBetweenRow height="200px" margin="0 0 1rem 0">
        <JustifyCenterColumn width="280px">
          <FinanceInfoPaidTypeDonutChart dateRange={dateRange} />
        </JustifyCenterColumn>
        <JustifyCenterColumn>
          <FinanceInfoInstallmentBarChart dateRange={dateRange} />
        </JustifyCenterColumn>
        <JustifyCenterColumn width="280px">
          <FinanceInfoPaidDonutPercentage dateRange={dateRange} />
        </JustifyCenterColumn>
      </JustifyBetweenRow>
      <JustifyBetweenRow height="65px" margin="0 0 0.5rem 0">
        <JustifyBetweenRow width="330px">
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
          <DataTable
            className="data-table"
            fixedHeader
            columns={columns}
            data={data || []}
            onRowClicked={handleRowClicked}
          />
        ) : (
          <NoTableData />
        )}
      </ItemContainer>
    </ItemContainer>
  )
}

export default FinanceInfoInstallmentTab
