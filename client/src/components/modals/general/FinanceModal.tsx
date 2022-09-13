import React, { useState } from 'react'
import {
  Button,
  H1,
  ItemContainer,
  JustifyBetweenColumn,
  JustifyBetweenRow,
  JustifyCenterColumn,
  JustifyCenterRow,
  NoTableData,
  SideDrawerPortal,
  TableSkeltonLoader
} from '@/components'
import { ModalBody, ModalHeader } from '@components/modals/types'
import colors from '@constants/colors'
import useAccessStore from '@hooks/useAccessStore'
import { useGetInvoicesQuery } from '@services/settings/finance-planning/financePlanningService'
import DataTable from 'react-data-table-component'

const FinanceModal = () => {
  const { data: invoices, isLoading: isInvoicesLoading } = useGetInvoicesQuery(undefined)
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false)

  const columns = [
    {
      name: 'Invoice',
      selector: row => row.category.name,
      sortable: true,
      cell: data => <div>{data.category.name}</div>
    }
  ]

  return (
    <JustifyBetweenColumn height="100%">
      <ModalHeader>
        <ItemContainer>
          <JustifyCenterRow width="100%">
            <H1 margin="0" textAlign="center" fontWeight="700" color={colors.white.primary}>
              Finance invoices
            </H1>
          </JustifyCenterRow>
        </ItemContainer>
      </ModalHeader>

      <ModalBody height="calc(100%)">
        <JustifyBetweenRow height="200px" margin="0 0 1rem 0">
          <JustifyCenterColumn>Up Coming Chart</JustifyCenterColumn>
          <JustifyCenterColumn>Up Coming Chart</JustifyCenterColumn>
          <JustifyCenterColumn>Up Coming Chart</JustifyCenterColumn>
        </JustifyBetweenRow>
        <JustifyBetweenRow margin="0 0 0.5rem 0">
          <div style={{ width: '100%' }}></div>
          <div style={{ width: '100px' }}>
            <Button onClick={setIsSideDrawerOpen.bind(this, true)}>Filter</Button>
          </div>
        </JustifyBetweenRow>
        <ItemContainer height="calc(100% - 40px - 0.5rem - 200px)">
          {isInvoicesLoading ? (
            <ItemContainer height="100%">
              <TableSkeltonLoader count={13} />
            </ItemContainer>
          ) : invoices && invoices.length > 0 ? (
            <DataTable fixedHeader columns={columns} data={invoices || []} />
          ) : (
            <NoTableData />
          )}
        </ItemContainer>
      </ModalBody>
      <SideDrawerPortal isOpen={isSideDrawerOpen} wrapperId="side-drawer-root">
        selam
        <div style={{ width: 50, height: 30 }}>
          <Button onClick={setIsSideDrawerOpen.bind(this, false)}>close</Button>
        </div>
      </SideDrawerPortal>
    </JustifyBetweenColumn>
  )
}

export default FinanceModal
