import {
  ActionButtons,
  CircleColor,
  CreateRefferedByModal,
  CreateReliableTypeModal,
  CreateRoleModal,
  CreateTaskCategoryModal,
  DataTableHeader,
  InnerWrapper
} from '@/components'
import { Badge } from '@/components/badge'
import useAccessStore from '@/hooks/useAccessStore'
import { ESize, EStatus } from '@/models'
import { openModal } from '@/store'
import { selectColorForStatus } from '@/utils/statusColorUtil'
import React from 'react'
import DataTable from 'react-data-table-component'

const RelationTypeTab = () => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const columns = [
    {
      name: 'Relate From',
      selector: row => row.relationFrom,
      sortable: true,
      cell: data => <div>{data.relationFrom} </div>
    },
    {
      name: 'Relate To',
      selector: row => row.relationTo,
      sortable: true,
      cell: data => <CircleColor cursor="normal" color={data.relationTo} />
    },
    {
      name: 'Status',
      selector: row => row.status,
      sortable: true,
      cell: data => <Badge color={selectColorForStatus(EStatus[data.status])}>{data.status} </Badge>
    },
    {
      name: 'Actions',
      selector: row => row.year,
      right: true,
      header: ({ title }) => <div style={{ textAlign: 'center', color: 'red' }}>{title}</div>,
      cell: data => (
        <ActionButtons
          onRead={function (): void {
            throw new Error('Function not implemented.')
          }}
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
      relationFrom: 'Children',
      relationTo: 'Parent',
      status: 'Active'
    },
    {
      id: 2,
      relationFrom: 'Husband',
      relationTo: 'Wife',
      status: 'Inactive'
    },
    {
      id: 3,
      relationFrom: 'Wife',
      relationTo: 'Husband',
      status: 'Inactive'
    }
  ]

  const openCreateRoleModal = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(
      openModal({
        id: 'createReliableTypeModal',
        title: 'Create reliable type',
        body: <CreateReliableTypeModal />,
        size: ESize.Small
      })
    )
  }

  return (
    <InnerWrapper>
      <DataTableHeader handleAddNew={openCreateRoleModal} />
      <DataTable fixedHeader columns={columns} data={data} />
    </InnerWrapper>
  )
}

export default RelationTypeTab
