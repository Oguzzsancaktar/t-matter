import useAccessStore from '@hooks/useAccessStore'
import { useState } from 'react'
import moment from 'moment'
import DataTable, { TableColumn } from 'react-data-table-component'
import { ITaskStep } from '@models/Entities/workflow/task/ICustomerTask'
import {
  DatePicker,
  ItemContainer,
  JustifyBetweenRow,
  JustifyCenterColumn,
  NoTableData,
  TableSkeltonLoader
} from '@/components'
import * as React from 'react'
import colors from '@constants/colors'
import { selectUser } from '@/store'
import { HR_TASK_TYPES } from '@constants/hrTask'
import { useGetHrTasksQuery } from '@services/hrTaskService'
import { IHrTask } from '@/models'
import { getFullName } from '@utils/userUtil'
import constantToLabel from '@utils/constantToLabel'

const AbsentHrTab = props => {
  const { useAppDispatch, useAppSelector } = useAccessStore()
  const user = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const [dateRange, setDateRange] = useState({
    startDate: props.dateRange ? props.dateRange.startDate : moment().startOf('year').toDate(),
    endDate: props.dateRange ? props.dateRange.endDate : moment().endOf('year').toDate()
  })
  const { data } = useGetHrTasksQuery(
    {
      userId: user?._id as string,
      type: HR_TASK_TYPES.ABSENT
    },
    { skip: user?._id === undefined }
  )

  const columns: TableColumn<IHrTask>[] = [
    {
      name: 'User',
      selector: row => getFullName(row.owner),
      sortable: true,
      cell: row => getFullName(row.owner)
    },
    {
      name: 'Date',
      selector: row => moment(row.startDate).toString(),
      sortable: true,
      cell: row => moment(row.startDate).format('MMM DD YYYY')
    },
    {
      name: 'Category',
      selector: row => row.type,
      sortable: true,
      cell: row => constantToLabel(row.type)
    }
  ]

  return (
    <ItemContainer padding="1rem" height="100%">
      <JustifyBetweenRow height="200px" margin="0 0 1rem 0">
        <JustifyCenterColumn width="280px">Chart left</JustifyCenterColumn>
        <JustifyCenterColumn>chart middle</JustifyCenterColumn>
        <JustifyCenterColumn width="280px">chart right</JustifyCenterColumn>
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
        <div style={{ display: 'flex', alignItems: 'flex-end', flex: 1, height: '100%', paddingBottom: 3 }}>
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
        {data && data.length > 0 ? (
          <ItemContainer height="100%">
            <TableSkeltonLoader count={13} />
          </ItemContainer>
        ) : [] && [].length > 0 ? (
          <DataTable className="data-table" fixedHeader columns={columns} data={data || []} onRowClicked={() => {}} />
        ) : (
          <NoTableData />
        )}
      </ItemContainer>
    </ItemContainer>
  )
}

export default AbsentHrTab
