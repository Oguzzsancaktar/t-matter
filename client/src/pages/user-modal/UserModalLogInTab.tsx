import {
  Column,
  DataTableHeader,
  ItemContainer,
  JustifyBetweenColumn,
  JustifyBetweenRow,
  JustifyCenterColumn,
  NoTableData
} from '@/components'
import useAccessStore from '@/hooks/useAccessStore'

import { useGetUserLogsByIdQuery } from '@/services/userLogService'
import moment from 'moment'
import React from 'react'
import DataTable from 'react-data-table-component'

interface IProps {
  userId: string
}

const UserModalLogInTab: React.FC<IProps> = ({ userId }) => {
  const { useAppDispatch } = useAccessStore()

  const { data: userTimeLogData, isLoading: userTimeLogIsLoading } = useGetUserLogsByIdQuery({
    userId,
    timeOffSet: new Date().getTimezoneOffset(),
    condition: 'ALL'
  })

  const columns = [
    {
      name: 'Date',
      selector: row => row.date,
      sortable: true
    },
    {
      name: 'Log In',
      selector: row => moment(row.login).format('MMMM-DD-YYYY'),
      sortable: true
    },
    {
      name: 'Log Out',
      selector: row => moment(row.logout).format('MMMM-DD-YYYY'),
      sortable: true
    },
    {
      name: 'Total Time',
      selector: row => row.totalTime,
      sortable: true,
      cell: data => data.totalTime
    }
    // {
    //   name: 'Actions',width:"120px",
    //   selector: row => row.year,
    //   right: true,
    //   header: ({ title }) => <div style={{ textAlign: 'center', color: 'red' }}>{title}</div>,
    //   cell: data => (
    //     <ActionButtons
    //       onRead={() => console.log('not implemented')}
    //       onEdit={function (): void {
    //         throw new Error('Function not implemented.')
    //       }}
    //       onHistory={function (): void {
    //         throw new Error('Function not implemented.')
    //       }}
    //       onDelete={function (): void {
    //         throw new Error('Function not implemented.')
    //       }}
    //     />
    //   )
    // }
  ]

  return (
    <ItemContainer>
      <JustifyBetweenColumn height="100%">
        <JustifyBetweenRow height="200px" margin="0 0 1rem 0">
          <JustifyCenterColumn>Up Coming Chart</JustifyCenterColumn>
          <JustifyCenterColumn>Up Coming Chart</JustifyCenterColumn>
          <JustifyCenterColumn>Up Coming Chart</JustifyCenterColumn>
        </JustifyBetweenRow>
        <Column height="calc(100% - 200px - 1rem)">
          <DataTableHeader handleAddNew={() => console.log('not implemented')} showAddNew={false} />
          {!userTimeLogIsLoading && userTimeLogData && userTimeLogData.length > 0 ? (
            <DataTable className="data-table" fixedHeader columns={columns} data={userTimeLogData || []} />
          ) : (
            <NoTableData />
          )}
        </Column>
      </JustifyBetweenColumn>
    </ItemContainer>
  )
}

export default UserModalLogInTab
