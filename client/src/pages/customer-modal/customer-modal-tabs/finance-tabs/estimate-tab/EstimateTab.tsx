import React, { useEffect, useState } from 'react'
import { JustifyCenterRow, H1, Column, ProgressBar, JustifyCenterColumn, JustifyBetweenRow } from '@/components'
import styled from 'styled-components'
import { DragDropContext, DropResult, ResponderProvided } from 'react-beautiful-dnd'
import colors from '@constants/colors'
import {
  InvoicesBarChart,
  CreateInvoiceList,
  InvoicedList,
  NonBillableList,
  CreateInvoice,
  ExpiredTaskStepList,
  NonBillableCircleProgress,
  UnPaidInvoicesCircleProgress,
  InvoicesDonut,
  AdditionalTimeDonut,
  DiscountedInvoicesDonut
} from '@/pages'
import { useGetTasksByCustomerIdQuery, useReorderTasksMutation } from '@services/customers/taskService'
import { ICustomerTask, IExpiredTaskStep, Invoice } from '@/models'
import { arrayMoveImmutable } from 'array-move'
import {
  useGetExpiredTaskStepsQuery,
  useGetFinancePlanningQuery,
  useGetInvoiceCategoriesQuery,
  useGetInvoicesQuery
} from '@services/settings/finance-planning/financePlanningService'
import { emptyQueryParams } from '@constants/queryParams'
import { invoiceDefault } from '@constants/finance'
import invoicesDonut from '@pages/customer-modal/customer-modal-tabs/finance-tabs/estimate-tab/InvoicesDonut'

const Bordered = styled.div<{ margin?: string; width?: string }>`
  border: 1px solid #ccc;
  height: 100%;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 1rem 0.5rem;
  margin: ${({ margin }) => (margin ? margin : '0')};
  width: ${({ width }) => (width ? width : '100%')};
`

interface IState {
  createInvoiceTasks: ICustomerTask[]
  nonBillableTasks: ICustomerTask[]
}

interface IProps {
  customerId: string
  selectedInvoice?: Invoice
  handleSelectedInvoiceChange: (invoice: Invoice) => void
}

const EstimateTab: React.FC<IProps> = ({ customerId, selectedInvoice, handleSelectedInvoiceChange }) => {
  const {
    data: customerTasksData,
    isLoading: customerTasksIsLoading,
    refetch: r1
  } = useGetTasksByCustomerIdQuery({ customerId, isInvoiced: false })
  const { data: invoiceCategories, isLoading: invoiceCategoriesLoading } =
    useGetInvoiceCategoriesQuery(emptyQueryParams)
  const [reorder] = useReorderTasksMutation()
  const { data: invoices, isLoading: isInvoicesLoading } = useGetInvoicesQuery(customerId)
  const {
    data: expiredTaskSteps,
    isLoading: isExpiredTaskStepsLoading,
    refetch: r2
  } = useGetExpiredTaskStepsQuery({ customerId, isInvoiced: false })

  const [state, setState] = useState<IState>({
    createInvoiceTasks: [],
    nonBillableTasks: []
  })
  const [expiredTaskStepsState, setExpiredTaskStepsState] = useState<{
    nonBillable: IExpiredTaskStep[]
    createInvoice: IExpiredTaskStep[]
  }>({
    nonBillable: [],
    createInvoice: []
  })

  const [invoice, setInvoice] = useState<Invoice>({ ...invoiceDefault })

  const refetch = () => {
    r1()
    r2()
  }

  useEffect(() => {
    if (customerTasksData) {
      setState({ createInvoiceTasks: [], nonBillableTasks: customerTasksData })
    }
  }, [customerTasksData])

  useEffect(() => {
    if (invoice) {
      setInvoice({ ...invoice, total: invoice.amount - invoice.discount })
    }
  }, [invoice?.discount])

  useEffect(() => {
    if (expiredTaskSteps) {
      setExpiredTaskStepsState({ createInvoice: [], nonBillable: expiredTaskSteps })
    }
  }, [expiredTaskSteps])

  if (customerTasksIsLoading) return <JustifyCenterRow>Loading...</JustifyCenterRow>

  const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
    const { destination, source, draggableId } = result
    // if (destination?.droppableId === source.droppableId) {
    //   if (destination.index === source.index) {
    //     return
    //   }
    //   const arr = arrayMoveImmutable(state[destination.droppableId], source.index, destination.index) as ICustomerTask[]
    //   setState(s => {
    //     return {
    //       ...s,
    //       [destination.droppableId]: arr
    //     }
    //   })
    //   setTimeout(() => {
    //     const reorderd = state.nonBillableTasks?.map((x, i) => ({ _id: x._id, index: i }))
    //     if (reorderd.length > 0) {
    //       reorder(reorderd)
    //     }
    //   }, 0)
    // }
    if (destination?.droppableId === 'createInvoiceTasks' && source?.droppableId === 'expiredTaskSteps') {
      const i = expiredTaskStepsState.nonBillable.findIndex(x => x._id === draggableId)
      if (i === -1) {
        return
      }
      const expiredTaskStep = expiredTaskStepsState.nonBillable[i]
      const newNonBillable = [...expiredTaskStepsState.nonBillable]
      newNonBillable.splice(i, 1)
      const newCreateInvoice = [...expiredTaskStepsState.createInvoice]
      newCreateInvoice.splice(destination.index, 0, expiredTaskStep)
      setExpiredTaskStepsState({
        ...expiredTaskStepsState,
        nonBillable: newNonBillable,
        createInvoice: newCreateInvoice
      })
      setInvoice({
        ...invoice,
        amount: invoice.amount + expiredTaskStep.expiredTimePrice,
        total: invoice.amount + expiredTaskStep.expiredTimePrice - invoice.discount
      })
    }
    if (destination?.droppableId === 'expiredTaskSteps' && source?.droppableId === 'createInvoiceTasks') {
      const i = expiredTaskStepsState.createInvoice.findIndex(x => x._id === draggableId)
      if (i === -1) {
        return
      }
      const expiredTaskStep = expiredTaskStepsState.createInvoice[i]
      const newCreateInvoice = [...expiredTaskStepsState.createInvoice]
      newCreateInvoice.splice(i, 1)
      const newNonBillable = [...expiredTaskStepsState.nonBillable]
      newNonBillable.splice(destination.index, 0, expiredTaskStep)
      setExpiredTaskStepsState({
        ...expiredTaskStepsState,
        nonBillable: newNonBillable,
        createInvoice: newCreateInvoice
      })
      setInvoice({
        ...invoice,
        amount: invoice.amount - expiredTaskStep.expiredTimePrice,
        total: invoice.amount - expiredTaskStep.expiredTimePrice - invoice.discount
      })
    }
    if (destination?.droppableId === 'createInvoiceTasks' && source.droppableId === 'nonBillableTasks') {
      const i = state.nonBillableTasks.findIndex(task => task._id === draggableId)
      if (i === -1) {
        return
      }
      const task = state.nonBillableTasks[i]
      const newNonBillableTasks = [...state.nonBillableTasks]
      newNonBillableTasks.splice(i, 1)
      const newCreateInvoiceTasks = [...state.createInvoiceTasks]
      newCreateInvoiceTasks.splice(destination.index, 0, task)
      setState({ ...state, createInvoiceTasks: newCreateInvoiceTasks, nonBillableTasks: newNonBillableTasks })
      setInvoice({
        ...invoice,
        amount: invoice.amount + (task.totalPrice as number),
        total: invoice.amount + (task.totalPrice as number) - invoice.discount
      })
    }
    if (destination?.droppableId === 'nonBillableTasks' && source.droppableId === 'createInvoiceTasks') {
      const i = state.createInvoiceTasks.findIndex(task => task._id === draggableId)
      if (i === -1) {
        return
      }
      const task = state.createInvoiceTasks[i]
      const newCreateInvoiceTasks = [...state.createInvoiceTasks]
      newCreateInvoiceTasks.splice(i, 1)
      const newNonBillableTasks = [...state.nonBillableTasks]
      newNonBillableTasks.splice(destination.index, 0, task)
      setState({ ...state, createInvoiceTasks: newCreateInvoiceTasks, nonBillableTasks: newNonBillableTasks })
      setInvoice({
        ...invoice,
        amount: invoice.amount - (task.totalPrice as number),
        total: invoice.amount - (task.totalPrice as number) - invoice.discount
      })
    }
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '1rem' }}>
      <JustifyCenterRow margin="0 0 1rem 0" height="235px">
        <Bordered width="100%">
          <JustifyBetweenRow height="100%">
            <InvoicesDonut
              selectedInvoice={selectedInvoice}
              onSelect={handleSelectedInvoiceChange}
              customerId={customerId}
            />
            <DiscountedInvoicesDonut
              selectedInvoice={selectedInvoice}
              onSelect={handleSelectedInvoiceChange}
              customerId={customerId}
            />
            <NonBillableCircleProgress customerId={customerId} />
            <AdditionalTimeDonut customerId={customerId} />
          </JustifyBetweenRow>
        </Bordered>
      </JustifyCenterRow>
      <JustifyCenterRow height={'calc(70% - 40px)'}>
        <DragDropContext key="context" onDragEnd={onDragEnd}>
          <Bordered margin="0 12px 0 0" width="33%">
            <H1 color={colors.text.primary}>Invoiced</H1>
            <InvoicedList openInvoice={selectedInvoice} invoices={invoices} />
          </Bordered>
          <div style={{ margin: '0 12px 0 0', width: '33%' }}>
            <Bordered style={{ marginBottom: 8 }}>
              <H1 color={colors.text.primary}>Additional time</H1>
              <ExpiredTaskStepList expiredTaskSteps={expiredTaskStepsState.nonBillable} />
            </Bordered>
            <Bordered>
              <H1 color={colors.text.primary}>Non billable</H1>
              <NonBillableList nonBillableTasks={state.nonBillableTasks} />
            </Bordered>
          </div>
          <Bordered width="33%">
            <H1 color={colors.text.primary}>New invoice</H1>
            <CreateInvoiceList
              expiredTaskSteps={expiredTaskStepsState.createInvoice}
              createInvoiceTasks={state.createInvoiceTasks}
            />
            <CreateInvoice
              customerId={customerId}
              expiredTaskSteps={expiredTaskStepsState.createInvoice}
              createInvoiceTasks={state.createInvoiceTasks}
              setInvoice={setInvoice}
              invoiceCategories={invoiceCategories}
              invoice={invoice}
              refetch={refetch}
            />
          </Bordered>
        </DragDropContext>
      </JustifyCenterRow>
    </div>
  )
}

export default EstimateTab
