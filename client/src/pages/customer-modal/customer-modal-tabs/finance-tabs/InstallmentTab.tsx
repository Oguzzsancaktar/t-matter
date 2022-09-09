import React, { useState } from 'react'
import {
  ActionButtons,
  Badge,
  Button,
  CircleColor,
  Column,
  CreateInstallmentModal,
  H1,
  IconButton,
  InstallmentPrintModal,
  ItemContainer,
  JustifyBetweenRow,
  JustifyCenterRow,
  NoTableData,
  PostponeInstallmentModal,
  RePlanningInstallmentModal,
  RoleBadge,
  Row,
  SearchCustomersModal,
  TableSkeltonLoader,
  UserBadge
} from '@/components'
import colors from '@constants/colors'
import { AdditionalTimeDonut, InvoicesDonut, NonBillableCircleProgress, UnPaidInvoicesCircleProgress } from '@/pages'
import styled from 'styled-components'
import useAccessStore from '@hooks/useAccessStore'
import { openModal } from '@/store'
import { ESize, IInstallment, Invoice } from '@/models'
import DataTable from 'react-data-table-component'
import {
  useGetFinancePlanningQuery,
  useGetInstallmentsQuery,
  useResetInstallmentsMutation
} from '@services/settings/finance-planning/financePlanningService'
import { Calendar, DollarSign, Edit, FileText, Printer, UserCheck } from 'react-feather'
import moment from 'moment'
import PayInstallment from '@components/modals/finance/PayInstallmentModal'
import Flatpickr from 'react-flatpickr'
import { INSTALLMENT_TYPES } from '@constants/finance'
import invoice from '@models/Entities/finance/Invoice'
import Swal from 'sweetalert2'
import constantToLabel from '@utils/constantToLabel'

const Bordered = styled.div<{ margin?: string; width?: string }>`
  border: 1px solid ${colors.gray.light};
  height: 100%;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 1rem 0.5rem;
  margin: ${({ margin }) => (margin ? margin : '0')};
  width: ${({ width }) => (width ? width : '100%')};
`

interface IProps {
  customerId: string
}

const InstallmentTab: React.FC<IProps> = ({ customerId }) => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice>()
  const { data: installments, isLoading: isInstallmentsLoading } = useGetInstallmentsQuery(selectedInvoice?._id, {
    skip: !selectedInvoice
  })
  const { data: financePlanning, isLoading: isFinancePlanningLoading } = useGetFinancePlanningQuery()
  const [resetInstallments] = useResetInstallmentsMutation()

  const showCreateInstallment = () => {
    if (selectedInvoice) {
      dispatch(
        openModal({
          id: `createInstallment`,
          title: 'Create Installment Modal',
          body: <CreateInstallmentModal invoice={selectedInvoice} />,
          width: ESize.WSmall,
          height: ESize.WSmall,
          maxWidth: ESize.WSmall
        })
      )
    }
  }

  const showRePlanningInstallment = () => {
    if (selectedInvoice) {
      dispatch(
        openModal({
          id: `rePlanningInstallment`,
          title: 'Re Planning Installment Modal',
          body: <RePlanningInstallmentModal invoice={selectedInvoice} />,
          width: ESize.WSmall,
          height: ESize.WSmall,
          maxWidth: ESize.WSmall
        })
      )
    }
  }

  const showPayInstallment = (installment: IInstallment) => {
    if (selectedInvoice) {
      dispatch(
        openModal({
          id: `payInstallment`,
          title: 'Pay Installment Modal',
          body: <PayInstallment invoice={selectedInvoice} installment={installment} />,
          width: ESize.WSmall,
          height: ESize.WSmall,
          maxWidth: ESize.WSmall
        })
      )
    }
  }

  const showPostponeInstallment = (row: IInstallment) => {
    if (selectedInvoice) {
      dispatch(
        openModal({
          id: `postponeInstallment`,
          title: 'Postpone Installment Modal',
          body: (
            <PostponeInstallmentModal
              installment={row}
              selectedInvoice={selectedInvoice}
              setSelectedInvoice={setSelectedInvoice}
            />
          ),
          width: ESize.WSmall,
          height: ESize.WSmall,
          maxWidth: ESize.WSmall
        })
      )
    }
  }

  const showInstallmentPrint = ({ row, i }) => {
    if (selectedInvoice) {
      dispatch(
        openModal({
          id: `installmentPrint`,
          title: 'Installment Print Modal',
          body: (
            <InstallmentPrintModal
              installment={row}
              invoice={selectedInvoice}
              balance={calculateBalance(i)}
              customerId={customerId}
            />
          ),
          width: ESize.WSmall,
          height: ESize.WSmall,
          maxWidth: ESize.WSmall
        })
      )
    }
  }

  const handleResetInstallments = async () => {
    try {
      await Swal.fire({
        icon: 'question',
        title: 'Do you want remove all installment for selected invoice?',
        showCancelButton: true,
        confirmButtonColor: colors.blue.primary,
        cancelButtonColor: colors.red.primary,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      })
      await resetInstallments(selectedInvoice?._id)
    } catch (e) {}
  }

  const dateFormat = date => {
    return moment(date).format('MMM DD YY')
  }

  const calculateBalance = (index: number) => {
    if (selectedInvoice) {
      const slicedInstallments = installments?.slice(0, index + 1)
      const balance = slicedInstallments?.reduce(
        (acc, curr) => (acc - (curr.paidAmount ? curr.paidAmount : 0)) as number,
        +Math.ceil(selectedInvoice?.total)
      )
      return balance
    }
  }

  const columns = () => {
    if (!selectedInvoice) {
      return []
    }

    return [
      {
        name: 'Type',
        selector: row => row.type,
        sortable: true,
        cell: data => <div>{constantToLabel(data.type)}</div>
      },
      {
        name: 'Pay date',
        selector: row => row.payDate,
        sortable: true,
        cell: data => <div>{dateFormat(data.payDate)}</div>
      },
      {
        name: 'Installment amount',
        selector: row => row.payAmount,
        sortable: true,
        cell: data => <div>${data.payAmount}</div>
      },
      {
        name: 'Transaction date',
        selector: row => row.paidDate,
        sortable: true,
        cell: data => <div>{data.paidDate ? dateFormat(data.paidDate) : '-'}</div>
      },
      {
        name: 'Transaction amount',
        selector: row => row.paidAmount,
        sortable: true,
        cell: data => <div>${data.paidAmount}</div>
      },
      {
        name: 'Pay Amount',
        selector: row => row.payAmount,
        sortable: true,
        cell: data => <div>${data.payAmount - data.paidAmount}</div>
      },
      {
        name: 'Late fee',
        selector: row => row.lateFee,
        sortable: true,
        cell: data => <div>${data.lateFee}</div>
      },
      {
        name: 'Suspended fee',
        selector: row => row.suspendedFee,
        sortable: true,
        cell: data => <div>${data.suspendedFee}</div>
      },
      {
        name: 'Balance',
        selector: row => selectedInvoice?.total,
        sortable: true,
        cell: (data, i) => <div>${calculateBalance(i)}</div>
      },
      {
        name: 'Status',
        selector: row => row.status,
        sortable: true,
        cell: data => <div>{data.status}</div>
      },
      {
        name: 'Actions',
        selector: row => row._id,
        right: true,
        header: ({ title }) => <div style={{ textAlign: 'center', color: 'red' }}>{title}</div>,
        cell: (data: IInstallment, i: number) => (
          <Row>
            <IconButton
              // @ts-ignore
              onClick={showInstallmentPrint.bind(this, { row: data, i })}
              bgColor={colors.background.gray.light}
              margin="0 .2rem 0 0"
              children={<Printer size={'16px'} color={colors.text.primary} />}
            />
            <IconButton
              onClick={showPayInstallment.bind(this, data)}
              bgColor={colors.background.gray.light}
              margin="0 .2rem 0 0"
              children={<DollarSign size={'16px'} color={colors.text.primary} />}
            />
            {data.type === INSTALLMENT_TYPES.PAYMENT &&
              selectedInvoice?.postponeCount < (financePlanning?.installmentPostponeLimit?.value as number) && (
                <IconButton
                  onClick={showPostponeInstallment.bind(this, data)}
                  bgColor={colors.background.gray.light}
                  margin="0 .2rem 0 0"
                  children={<Calendar size={'16px'} color={colors.text.primary} />}
                />
              )}

            <IconButton
              onClick={() => {}}
              bgColor={colors.background.gray.light}
              margin="0 .2rem 0 0"
              children={<FileText size={'16px'} color={colors.text.primary} />}
            />
          </Row>
        )
      }
    ]
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '1rem' }}>
      <JustifyCenterRow margin="0 0 1rem 0" height="235px">
        <Bordered margin="0 0 0 8px" width="100%">
          <JustifyBetweenRow height="100%">
            <InvoicesDonut onSelect={setSelectedInvoice} customerId={customerId} />
            <AdditionalTimeDonut customerId={customerId} />
            <NonBillableCircleProgress customerId={customerId} />
            <UnPaidInvoicesCircleProgress customerId={customerId} />
          </JustifyBetweenRow>
        </Bordered>
      </JustifyCenterRow>
      <Column height={'calc(70% - 40px)'}>
        {selectedInvoice && (
          <>
            <JustifyBetweenRow>
              <div></div>
              {!(isInstallmentsLoading || (installments && installments?.length)) ? (
                <Row width="auto">
                  <Button width="200px" onClick={showCreateInstallment}>
                    Create Installment
                  </Button>
                </Row>
              ) : (
                <Row width="auto">
                  <JustifyCenterRow margin="0 1rem 0 0">
                    <Button color={colors.red.primary} width="200px" onClick={handleResetInstallments}>
                      Reset
                    </Button>
                  </JustifyCenterRow>
                  <JustifyCenterRow>
                    <Button width="200px" onClick={showRePlanningInstallment}>
                      Re Planning Installment
                    </Button>
                  </JustifyCenterRow>
                </Row>
              )}
            </JustifyBetweenRow>
            <ItemContainer height="calc(100% - 0.5rem - 0.5rem - 50px)" margin="0.5rem 0">
              {isInstallmentsLoading ? (
                <ItemContainer height="100%">
                  <TableSkeltonLoader count={13} />
                </ItemContainer>
              ) : installments && installments.length > 0 ? (
                <DataTable responsive fixedHeader columns={columns()} data={installments || []} />
              ) : (
                <NoTableData />
              )}
            </ItemContainer>
          </>
        )}
        {!selectedInvoice && (
          <JustifyCenterRow height="100%">
            <H1 width="auto" fontSize="2rem" color={colors.gray.disabled}>
              Select invoice to see installments
            </H1>
          </JustifyCenterRow>
        )}
      </Column>
    </div>
  )
}

export default InstallmentTab
