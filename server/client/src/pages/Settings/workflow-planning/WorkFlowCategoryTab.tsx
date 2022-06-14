import { ActionButtons, Column, CreateWorkflowCategoryModal, DataTableHeader } from '@/components'
import { Badge } from '@/components/badge'
import useAccessStore from '@/hooks/useAccessStore'
import { ESize, EStatus } from '@/models'
import { useGetCategoriesQuery } from '@/services/settings/workflow-planning/workflowPlanService'
import { openModal } from '@/store'
import { selectColorForStatus } from '@/utils/statusColorUtil'
import React from 'react'
import DataTable from 'react-data-table-component'

const WorkFlowCategory = () => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const { data: categoriesData, isLoading: isCategoriesLoading } = useGetCategoriesQuery()

  const columns = [
    {
      name: 'Category Name',
      selector: row => row.name,
      sortable: true,
      cell: data => <div>{data.name} </div>
    },
    {
      name: 'Status',
      selector: row => row.status,
      sortable: true,
      cell: data => <Badge color={selectColorForStatus(data.status)}>{EStatus[data.status]} </Badge>
    },
    {
      name: 'Actions',
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

  const openCreateRoleModal = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(
      openModal({
        id: 'createWorkflowCategoryModal',
        title: 'Create Workflow Category',
        body: <CreateWorkflowCategoryModal />,
        size: ESize.Small
      })
    )
  }

  return (
    <Column margin="0" width="100%">
      <DataTableHeader handleAddNew={openCreateRoleModal} />
      {!isCategoriesLoading && categoriesData && (
        <DataTable
          style={{ height: 'calc(100% - 56px)' }}
          pagination={true}
          paginationPerPage={5}
          fixedHeader
          columns={columns}
          data={categoriesData || []}
        />
      )}
    </Column>
  )
}

export default WorkFlowCategory
