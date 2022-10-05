import * as React from 'react'
import useAccessStore from '@hooks/useAccessStore'
import { useState } from 'react'
import moment from 'moment/moment'
import { useGetTaskStepsQuery } from '@services/customers/taskService'
import {
  DatePicker,
  ItemContainer,
  JustifyBetweenRow,
  JustifyCenterColumn,
  NoTableData,
  SelectInput,
  TableSkeltonLoader
} from '@/components'
import { INSTALLMENT_STATUS_OPTIONS } from '@constants/finance'
import colors from '@constants/colors'
import DataTable, { TableColumn } from 'react-data-table-component'
import { ITaskStep } from '@models/Entities/workflow/task/ICustomerTask'

const NewTasksTab = props => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()
  const [dateRange, setDateRange] = useState({
    startDate: props.dateRange ? props.dateRange.startDate : moment().startOf('year').toDate(),
    endDate: props.dateRange ? props.dateRange.endDate : moment().endOf('year').toDate()
  })
  const { data, isLoading } = useGetTaskStepsQuery(dateRange)

  const columns: TableColumn<ITaskStep>[] = [
    {
      name: 'Date',
      selector: row => moment(row.steps.startDate).toString(),
      sortable: true,
      cell: d => moment(d.steps.startDate).format('MMM/DD/YYYY')
    },
    {
      name: 'Customer',
      selector: row => row.customer.firstname + ' ' + row.customer.lastname,
      sortable: true,
      cell: d => d.customer.firstname + ' ' + d.customer.lastname
    },
    {
      name: 'Task name',
      selector: row => row.name + ' ' + row.steps.category.name,
      sortable: true,
      cell: d => d.name + ' - ' + d.steps.category.name
    }
  ]

  return (
    <ItemContainer padding="1rem" height="100%">
      <JustifyBetweenRow height="200px" margin="0 0 1rem 0">
        <JustifyCenterColumn width="280px">incoming charts....</JustifyCenterColumn>
        <JustifyCenterColumn>incoming charts....</JustifyCenterColumn>
        <JustifyCenterColumn width="280px">incoming charts....</JustifyCenterColumn>
      </JustifyBetweenRow>
      <JustifyBetweenRow height="65px" margin="0 0 0.5rem 0">
        <div style={{ minWidth: 330, display: 'flex', alignItems: 'center' }}>
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
        </div>
        <div style={{ minWidth: 200, marginLeft: 8, marginRight: 8 }}>
          <SelectInput
            selectedOption={
              [...INSTALLMENT_STATUS_OPTIONS, { label: 'All', value: 'ALL' }]?.filter(x => x.value === 'ALL') || []
            }
            labelText="Status"
            onChange={o => {}}
            name="status"
            options={[...INSTALLMENT_STATUS_OPTIONS, { label: 'All', value: 'ALL' }]}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', width: '100%', height: '100%', paddingBottom: 3 }}>
          <div
            style={{
              width: '100%',
              padding: '5px 10px',
              backgroundColor: 'rgba(248,245,245,0.82)',
              borderRadius: 3,
              marginRight: 8,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <span style={{ color: colors.green.primary, marginRight: 3 }}>incoming -</span>
            <span style={{ color: colors.green.primary }}>section</span>
          </div>
          <div
            style={{
              width: '100%',
              padding: '5px 10px',
              backgroundColor: 'rgba(248,245,245,0.82)',
              borderRadius: 3,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <span style={{ color: colors.red.primary, marginRight: 3 }}>incoming -</span>
            <span style={{ color: colors.red.primary }}>section</span>
          </div>
        </div>
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
            // onRowClicked={handleRowClicked}
          />
        ) : (
          <NoTableData />
        )}
      </ItemContainer>
    </ItemContainer>
  )
}

export default NewTasksTab
