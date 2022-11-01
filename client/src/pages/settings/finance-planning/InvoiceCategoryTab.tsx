import React, { useState } from 'react'
import {
  ActionButtons,
  Badge,
  Button,
  Column,
  ConfirmModal,
  CreateRoleModal,
  DataTableHeader,
  ItemContainer,
  JustifyBetweenColumn,
  JustifyBetweenRow,
  JustifyCenterColumn,
  NoTableData,
  ReadRoleModal,
  TableSkeltonLoader,
  UpdateRoleModal
} from '@/components'
import {
  useGetInvoiceCategoriesQuery,
  useUpdateInvoiceCategoryMutation
} from '@services/settings/finance-planning/financePlanningService'
import { statusOptions } from '@constants/statuses'
import DataTable from 'react-data-table-component'
import IInvoiceCategory from '@models/Entities/finance-plannin/IInvoiceCategory'
import { selectColorForStatus } from '@utils/statusColorUtil'
import { ESize, EStatus } from '@/models'
import { emptyQueryParams } from '@constants/queryParams'
import { closeModal, openModal } from '@/store'
import InvoiceCategoryReadModal from '@pages/settings/finance-planning/InvoiceCategoryReadModal'
import useAccessStore from '@hooks/useAccessStore'
import InvoiceCategoryCreateModal from '@pages/settings/finance-planning/InvoiceCategoryCreateModal'
import InvoiceCategoryUpdateModal from '@pages/settings/finance-planning/InvoiceCategoryUpdateModal'
import { toastError, toastSuccess } from '@utils/toastUtil'
import { AgreementUploadModal } from '@/pages'
import colors from '@constants/colors'

const InvoiceCategoryTab = () => {
  const [searchQueryParams, setSearchQueryParams] = useState(emptyQueryParams)
  const { data, isLoading } = useGetInvoiceCategoriesQuery(searchQueryParams)
  const [updateInvoiceCategory] = useUpdateInvoiceCategoryMutation()

  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const columns = [
    {
      name: 'Invoice Category',
      selector: row => row.name,
      sortable: true
    },
    {
      name: 'Status',
      width: '120px',
      selector: row => row.status,
      sortable: true,
      cell: data => <Badge color={selectColorForStatus(data.status)}>{EStatus[data.status]} </Badge>
    },
    {
      name: 'Agreement',
      width: '120px',
      cell: data => (
        <Button
          color={data.agreement ? colors.blue.primary : colors.orange.primary}
          onClick={showUploadAgreementModal.bind(this, data)}
        >
          {data.agreement ? 'Change' : 'Upload'}
        </Button>
      )
    },
    {
      name: 'Actions',
      width: '120px',
      right: true,
      cell: data => (
        <ActionButtons
          status={data.status}
          onEdit={handleEdit.bind(this, data)}
          onHistory={function (): void {
            throw new Error('Function not implemented.')
          }}
          onDelete={() => handleDelete(data)}
          onReactive={() => handleReactive(data)}
        />
      )
    }
  ]

  const handleRead = (invoiceCategory: IInvoiceCategory) => {
    dispatch(
      openModal({
        id: `readInvoiceCategoryModal-${invoiceCategory._id}`,
        title: 'Read Invoice Category',
        body: <InvoiceCategoryReadModal _id={invoiceCategory._id} />,
        width: ESize.WLarge,
        height: ESize.HAuto,
        maxWidth: ESize.WSmall
      })
    )
  }

  const showUploadAgreementModal = (invoiceCategory: IInvoiceCategory) => {
    return dispatch(
      openModal({
        id: `uploadAgreement-${invoiceCategory._id}`,
        title: 'Upload agreement',
        body: <AgreementUploadModal invoiceCategory={invoiceCategory} />,
        width: ESize.WSmall,
        height: ESize.WSmall,
        maxWidth: ESize.WSmall
      })
    )
  }

  const handleEdit = (invoiceCategory: IInvoiceCategory) => {
    dispatch(
      openModal({
        id: `updateInvoiceCategoryModal-${invoiceCategory._id}`,
        title: 'Update Invoice Category',
        body: <InvoiceCategoryUpdateModal invoiceCategory={invoiceCategory} />,
        width: ESize.WLarge,
        height: ESize.HAuto,
        maxWidth: ESize.WSmall
      })
    )
  }

  const handleDelete = (invoiceCategory: IInvoiceCategory) => {
    dispatch(
      openModal({
        id: `deleteInvoiceCategoryModal-${invoiceCategory._id}`,
        title: `Are you sure to inactivate ${invoiceCategory.name}?`,
        body: (
          <ConfirmModal
            modalId={`deleteRoleModal-${invoiceCategory._id}`}
            title={`Are you sure to inactivate ${invoiceCategory.name}?`}
            onConfirm={() => handleOnConfirmDelete(invoiceCategory)}
          />
        ),
        width: ESize.WLarge,
        height: ESize.HAuto,
        maxWidth: ESize.WSmall
      })
    )
  }

  const handleReactive = (invoiceCategory: IInvoiceCategory) => {
    dispatch(
      openModal({
        id: `reactiveInvoiceCategoryModal-${invoiceCategory._id}`,
        title: `Are you sure to reactivate ${invoiceCategory.name}?`,
        body: (
          <ConfirmModal
            modalId={`reactiveInvoiceCategoryModal-${invoiceCategory._id}`}
            title={`Are you sure to reactivate ${invoiceCategory.name}?`}
            onConfirm={() => handleOnConfirmReactive(invoiceCategory)}
          />
        ),
        width: ESize.WLarge,
        height: ESize.HAuto,
        maxWidth: ESize.WSmall
      })
    )
  }

  const handleOnConfirmDelete = async (invoiceCategory: IInvoiceCategory) => {
    try {
      await updateInvoiceCategory({ ...invoiceCategory, status: EStatus.Inactive })
      toastSuccess('Invoice category ' + invoiceCategory.name + ' inactivated successfully')
      dispatch(closeModal(`deleteInvoiceCategoryModal-${invoiceCategory._id}`))
    } catch (error) {
      toastError('Error inactivating role')
    }
  }

  const handleOnConfirmReactive = async (invoiceCategory: IInvoiceCategory) => {
    try {
      await updateInvoiceCategory({ ...invoiceCategory, status: EStatus.Active })
      toastSuccess('Invoice category ' + invoiceCategory.name + ' reactivating successfully')
      dispatch(closeModal(`reactiveInvoiceCategoryModal-${invoiceCategory._id}`))
    } catch (error) {
      toastError('Error reactivating role')
    }
  }

  const handleCreate = e => {
    e.preventDefault()
    dispatch(
      openModal({
        id: 'createInvoiceCategoryModal',
        title: 'Create Invoice Category',
        body: <InvoiceCategoryCreateModal />,
        width: ESize.WLarge,
        height: ESize.HAuto,
        maxWidth: ESize.WSmall
      })
    )
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQueryParams({ ...searchQueryParams, search: event.target.value })
  }
  const handleStatusFilter = (status: number | string) => {
    setSearchQueryParams({ ...searchQueryParams, status: +status })
  }
  return (
    <JustifyBetweenColumn height="100%">
      <JustifyBetweenRow height="200px" margin="0 0 1rem 0">
        <JustifyCenterColumn>Up Coming Chart</JustifyCenterColumn>
        <JustifyCenterColumn>Up Coming Chart</JustifyCenterColumn>
        <JustifyCenterColumn>Up Coming Chart</JustifyCenterColumn>
      </JustifyBetweenRow>
      <Column height="calc(100% - 200px - 1rem)">
        <DataTableHeader
          handleAddNew={handleCreate}
          status={statusOptions.find(status => +status.value === searchQueryParams.status)}
          handleSearch={handleSearch}
          handleStatusFilter={handleStatusFilter}
        />

        <ItemContainer height="calc(100% - 40px - 0.5rem)">
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
              onRowClicked={handleRead}
            />
          ) : (
            <NoTableData />
          )}
        </ItemContainer>
      </Column>
    </JustifyBetweenColumn>
  )
}

export default InvoiceCategoryTab
