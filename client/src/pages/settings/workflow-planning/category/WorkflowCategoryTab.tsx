import {
  ActionButtons,
  CircleColor,
  Column,
  ConfirmModal,
  CreateWorkflowCategoryModal,
  DataTableHeader,
  ItemContainer,
  JustifyCenterRow,
  NoTableData,
  ReadWorkflowCategoryModal,
  TableSkeltonLoader,
  UpdateWorkflowCategoryModal
} from '@/components'
import { Badge } from '@/components/badge'
import { emptyQueryParams } from '@/constants/queryParams'
import { statusOptions } from '@/constants/statuses'
import useAccessStore from '@/hooks/useAccessStore'
import { ESize, EStatus, ITaskCategory } from '@/models'
import {
  useGetCategoriesQuery,
  useUpdateCategoryStatusMutation
} from '@/services/settings/workflow-planning/workflowService'
import { closeModal, openModal } from '@/store'
import { selectColorForStatus } from '@/utils/statusColorUtil'
import { toastSuccess, toastError } from '@/utils/toastUtil'
import React, { useState } from 'react'
import DataTable from 'react-data-table-component'

const WorkflowCategory = () => {
  const [searchQueryParams, setSearchQueryParams] = useState(emptyQueryParams)

  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const [updateCategoryStatus] = useUpdateCategoryStatusMutation()
  const { data: categoriesData, isLoading: isCategoriesLoading } = useGetCategoriesQuery(searchQueryParams)

  console.log(categoriesData)
  const columns = [
    {
      name: 'Category Name',
      selector: row => row.name,
      sortable: true,
      cell: data => <div>{data.name} </div>
    },

    {
      name: 'Color',
      width: '120px',
      selector: row => row.color,
      sortable: true,
      cell: data => <CircleColor color={data?.color?.color} />
    },

    {
      name: 'Status',
      width: '120px',
      selector: row => row.status,
      sortable: true,
      cell: data => <Badge color={selectColorForStatus(data.status)}>{EStatus[data.status]} </Badge>
    },
    {
      name: 'Actions',
      width: '120px',
      right: true,
      header: ({ title }) => <div style={{ textAlign: 'center', color: 'red' }}>{title}</div>,
      cell: data => (
        <ActionButtons
          status={data.status}
          onEdit={() => handleEdit(data)}
          onHistory={function (): void {
            throw new Error('Function not implemented.')
          }}
          onDelete={() => handleDelete(data)}
          onReactive={() => handleReactive(data)}
        />
      )
    }
  ]

  const handleRead = (category: ITaskCategory) => {
    dispatch(
      openModal({
        id: `readWorkflowCategoryModal-${category._id}`,
        title: 'Create Category',
        body: <ReadWorkflowCategoryModal category={category} />,
        width: ESize.WLarge,
        height: ESize.HAuto,
        maxWidth: ESize.WSmall
      })
    )
  }

  const handleEdit = (category: ITaskCategory) => {
    dispatch(
      openModal({
        id: `updateWorkflowCategoryModal-${category._id}`,
        title: 'Update Category',
        body: <UpdateWorkflowCategoryModal category={category} />,
        width: ESize.WLarge,
        height: ESize.HAuto,
        maxWidth: ESize.WSmall
      })
    )
  }

  const handleDelete = (category: ITaskCategory) => {
    dispatch(
      openModal({
        id: `deleteWorkflowCategoryModal-${category._id}`,
        title: `Are you sure to inactivate ${category.name}?`,
        body: (
          <ConfirmModal
            modalId={`deleteWorkflowCategoryModal-${category._id}`}
            title={`Are you sure to inactivate ${category.name}?`}
            onConfirm={() => handleOnConfirmDelete(category)}
          />
        ),
        width: ESize.WLarge,
        height: ESize.HAuto,
        maxWidth: ESize.WSmall
      })
    )
  }

  const handleReactive = (category: ITaskCategory) => {
    dispatch(
      openModal({
        id: `reactiveWorkflowCategoryModal-${category._id}`,
        title: `Are you sure to reactivate ${category.name}?`,
        body: (
          <ConfirmModal
            modalId={`reactiveWorkflowCategoryModal-${category._id}`}
            title={`Are you sure to reactivate ${category.name}?`}
            onConfirm={() => handleOnConfirmReactive(category)}
          />
        ),
        width: ESize.WLarge,
        height: ESize.HAuto,
        maxWidth: ESize.WSmall
      })
    )
  }

  const handleOnConfirmDelete = async (category: ITaskCategory) => {
    try {
      await updateCategoryStatus({ _id: category._id, status: EStatus.Inactive })
      toastSuccess('Category ' + category.name + ' inactivated successfully')
      dispatch(closeModal(`deleteWorkflowCategoryModal-${category._id}`))
    } catch (error) {
      toastError('Error inactivating category')
    }
  }

  const handleOnConfirmReactive = async (category: ITaskCategory) => {
    try {
      await updateCategoryStatus({ _id: category._id, status: EStatus.Active })
      toastSuccess('Category ' + category.name + ' reactivated successfully')
      dispatch(closeModal(`reactiveWorkflowCategoryModal-${category._id}`))
    } catch (error) {
      toastError('Error reactivating category')
    }
  }

  const openCreateWorkflowCategoryModal = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(
      openModal({
        id: 'createWorkflowCategoryModal',
        title: 'Create Workflow Category',
        body: <CreateWorkflowCategoryModal />,
        width: ESize.WLarge,
        height: ESize.HAuto,
        maxWidth: ESize.WSmall
      })
    )
  }

  const handleStatusFilter = (status: number | string) => {
    setSearchQueryParams({ ...searchQueryParams, status: +status })
  }
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQueryParams({ ...searchQueryParams, search: event.target.value })
  }

  return (
    <Column margin="0" width="100%" height="100%">
      <DataTableHeader
        handleAddNew={openCreateWorkflowCategoryModal}
        status={statusOptions.find(status => +status.value === searchQueryParams.status)}
        handleSearch={handleSearch}
        handleStatusFilter={handleStatusFilter}
      />

      <ItemContainer height="calc(100% - 40px - 0.5rem)">
        {isCategoriesLoading ? (
          <ItemContainer>
            <TableSkeltonLoader count={13} />
          </ItemContainer>
        ) : categoriesData && categoriesData.length > 0 ? (
          <DataTable
            className="data-table"
            fixedHeader
            columns={columns}
            data={categoriesData || []}
            onRowClicked={handleRead}
          />
        ) : (
          <NoTableData />
        )}
      </ItemContainer>
    </Column>
  )
}

export default WorkflowCategory
