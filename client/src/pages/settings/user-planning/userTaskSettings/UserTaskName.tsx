import { ActionButtons, CreateRoleModal, CreateTaskNameModal, DataTableHeader, ItemContainer } from '@/components'
import { Badge } from '@/components/badge'
import useAccessStore from '@/hooks/useAccessStore'
import { ESize, EStatus } from '@/models'
import { openModal } from '@/store'
import { selectColorForStatus } from '@/utils/statusColorUtil'
import React from 'react'
import DataTable from 'react-data-table-component'

const UserTaskName = () => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const columns = [
    {
      name: 'Task',
      selector: row => row.task,
      sortable: true
    },
    {
      name: 'Category',
      selector: row => row.category,
      sortable: true,
      cell: data => <Badge color={selectColorForStatus(data.status)}>{data.status} </Badge>
    },
    {
      name: 'Title',
      selector: row => row.title,
      sortable: true
    },
    {
      name: 'Status',
      width: '120px',
      selector: row => row.status,
      sortable: true,
      cell: data => <div>{data.status} </div>
    },
    {
      name: 'Actions',
      width: '120px',
      selector: row => row.year,
      right: true,
      header: ({ title }) => <div style={{ textAlign: 'center', color: 'red' }}>{title}</div>,
      cell: data => (
        <ActionButtons
          onEdit={function (): void {
            throw new Error('Function not implemented.')
          }}
          onHistory={function (): void {
            throw new Error('Function not implemented.')
          }}
          onDelete={function (): void {
            throw new Error('Function not implemented.')
          }}
        />
      )
    }
  ]

  const data = [
    {
      id: 1,
      task: 'Task 1',
      category: 'User Finance',
      title: 'Salary Increased',
      status: 'Active'
    },
    {
      id: 2,
      task: 'Task 2',
      category: 'User Absent',
      title: 'Absent Days',
      status: 'Inactive'
    }
  ]

  const openCreateRoleModal = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(
      openModal({
        id: 'createTaskNameModal',
        title: 'Create Task Name',
        body: <CreateTaskNameModal />,
        width: ESize.WSmall,
        height: ESize.HSmall
      })
    )
  }

  return (
    <ItemContainer>
      <DataTableHeader handleAddNew={openCreateRoleModal} />
      <DataTable className="data-table" fixedHeader columns={columns} data={data} />
    </ItemContainer>
  )
}

export default UserTaskName
