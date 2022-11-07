import useAccessStore from '@hooks/useAccessStore'
import { useEffect, useState } from 'react'
import moment from 'moment'
import DataTable, { TableColumn } from 'react-data-table-component'

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
import { useLazyGetUserLogsByIdQuery } from '@services/userLogService'
import { selectUser } from '@/store'
import { IUserLog } from '@/models'
import { secondsToHourMin } from '@utils/timeUtils'

const LoginHrTab = props => {
  const { useAppDispatch, useAppSelector } = useAccessStore()
  const user = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const [dateRange, setDateRange] = useState({
    startDate: props.dateRange ? props.dateRange.startDate : moment().startOf('year').toDate(),
    endDate: props.dateRange ? props.dateRange.endDate : moment().endOf('year').toDate()
  })
  const [fetchUserTimeLogs, { data: timeLogs, isLoading: timeLogsLoading }] = useLazyGetUserLogsByIdQuery()

  useEffect(() => {
    if (user) {
      fetchUserTimeLogs({
        userId: user._id,
        timeOffSet: new Date().getTimezoneOffset(),
        startDate: moment(dateRange.startDate).toISOString(true),
        endDate: moment(dateRange.endDate).toISOString(true)
      })
    }
  }, [dateRange])

  const columns: TableColumn<IUserLog>[] = [
    {
      name: 'User',
      selector: row => user?.firstname + ' ' + user?.lastname,
      sortable: true,
      cell: row => user?.firstname + ' ' + user?.lastname
    },
    {
      name: 'Date',
      selector: row =>
        moment(row.date || '')
          .unix()
          .valueOf(),
      sortable: true,
      cell: row => moment(row.date).format('MM/DD/YYYY')
    },
    {
      name: 'Login',
      selector: row =>
        moment(row.login || '')
          .unix()
          .valueOf(),
      sortable: true,
      cell: row => moment(row.login).format('LT')
    },
    {
      name: 'Logout',
      selector: row =>
        moment(row.logout || '')
          .unix()
          .valueOf(),
      sortable: true,
      cell: row => moment(row.logout).format('LT')
    },
    {
      name: 'Working time',
      selector: row => row.totalTime,
      sortable: true,
      cell: row => secondsToHourMin(row.totalTime)
    },
    {
      name: 'Tracking',
      selector: row => '',
      sortable: true,
      cell: d => 'coming'
    },
    {
      name: 'Conditions',
      selector: row => '',
      sortable: true,
      width: '140px',
      cell: d => {
        return <JustifyBetweenRow>coming</JustifyBetweenRow>
      }
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
        {timeLogsLoading ? (
          <ItemContainer height="100%">
            <TableSkeltonLoader count={13} />
          </ItemContainer>
        ) : timeLogs && timeLogs?.length > 0 ? (
          <DataTable className="data-table" fixedHeader columns={columns} data={timeLogs} onRowClicked={() => {}} />
        ) : (
          <NoTableData />
        )}
      </ItemContainer>
    </ItemContainer>
  )
}

export default LoginHrTab
