import React, { useMemo, useState } from 'react'
import {
  Column,
  JustifyBetweenColumn,
  JustifyBetweenRow,
  JustifyCenterColumn,
  JustifyCenterRow
} from '@/components/layout'
import { ModalHeader, ModalBody } from '../types'
import { Button, Checkbox, H1, ItemContainer, NoTableData, TableSkeltonLoader, TextArea } from '@/components'
import { useGetInvoicesQuery } from '@services/settings/finance-planning/financePlanningService'
import { ICustomer, Invoice } from '@/models'
import DataTable from 'react-data-table-component'
import colors from '@constants/colors'
import moment from 'moment'
import { Mail } from 'react-feather'

const InvoiceMailModal: React.FC<{ customerId: ICustomer['_id'] }> = ({ customerId }) => {
  const { data: invoices, isLoading: isInvoicesLoading } = useGetInvoicesQuery(customerId)
  const [selectedInvoiceIds, setSelectedInvoiceIds] = useState<Invoice['_id'][]>([])
  const [note, setNote] = useState('')

  const columns = useMemo(() => {
    return [
      {
        name: 'Check',
        selector: row => row.category.name,
        sortable: true,
        cell: data => (
          <div
            onClick={() => {
              if (selectedInvoiceIds.some(id => id === data._id)) {
                setSelectedInvoiceIds(selectedInvoiceIds.filter(id => id !== data._id))
                return
              }
              setSelectedInvoiceIds([...selectedInvoiceIds, (data as Invoice)._id])
            }}
          >
            <Checkbox onChange={() => {}} isChecked={selectedInvoiceIds.some(id => id === data._id)} />
          </div>
        )
      },
      {
        name: 'Start Date',
        selector: row => row.createdAt,
        sortable: true,
        cell: data => <div>{moment(data.createdAt).format('MMM/DD/YY')}</div>
      },
      {
        name: 'Invoice',
        selector: row => row.category.name,
        sortable: true,
        cell: data => <div>{data.category.name}</div>
      },
      {
        name: 'Discount',
        selector: row => row.discount,
        sortable: true,
        cell: data => <div>${data.discount}</div>
      },
      {
        name: 'Total',
        selector: row => row.total,
        sortable: true,
        cell: data => <div>${Math.ceil(data.total)}</div>
      }
    ]
  }, [selectedInvoiceIds, invoices])

  return (
    <ItemContainer borderRadius="0.3rem" overflow="hidden" height="100%">
      <ModalHeader>
        <ItemContainer>
          <JustifyCenterRow width="100%">
            <H1 margin="0" textAlign="center" fontWeight="700" color={colors.white.primary}>
              Invoice mail
            </H1>
          </JustifyCenterRow>
        </ItemContainer>
      </ModalHeader>
      <ModalBody height="calc(100% - 63px)">
        <Column height="calc(100%- 30px)">
          <JustifyBetweenColumn height="200px" margin="0 0 1rem 0">
            <H1 color={colors.text.primary}>Mail Note</H1>
            <TextArea rows={8} name="mailNote" placeholder="Mail Note" onChange={e => setNote(e.target.value)} />
          </JustifyBetweenColumn>
          <Column height="calc(100% - 320px - 1rem)">
            {isInvoicesLoading ? (
              <ItemContainer height="100%">
                <TableSkeltonLoader count={13} />
              </ItemContainer>
            ) : invoices && invoices.length > 0 ? (
              <DataTable fixedHeader columns={columns} data={invoices || []} />
            ) : (
              <NoTableData />
            )}
          </Column>
        </Column>
        <JustifyBetweenColumn>
          <div />
          <Button width="60px" height="40px">
            <Mail />
          </Button>
        </JustifyBetweenColumn>
      </ModalBody>
    </ItemContainer>
  )
}

export default InvoiceMailModal
