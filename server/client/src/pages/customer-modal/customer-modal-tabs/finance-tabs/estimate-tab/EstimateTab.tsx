import React, { useEffect, useState } from 'react'
import { JustifyCenterRow, H1, Column, ProgressBar, JustifyCenterColumn } from '@/components'
import styled from 'styled-components'
import { DragDropContext, DropResult, ResponderProvided } from 'react-beautiful-dnd'
import colors from '@constants/colors'
import {
  InvoicesBarChart,
  CreateInvoiceList,
  InvoicedList,
  NonBillableList,
  CreateInvoice,
  ExpiredTaskStepList
} from '@/pages'
import { useGetTasksByCustomerIdQuery, useReorderTasksMutation } from '@services/customers/taskService'
import { ICustomerTask, IExpiredTaskStep, Invoice } from '@/models'
import { arrayMoveImmutable } from 'array-move'
import {
  useGetExpiredTaskStepsQuery,
  useGetInvoiceCategoriesQuery,
  useGetInvoicesQuery
} from '@services/settings/finance-planning/financePlanningService'
import emptyQueryParams from '@constants/queryParams'
import { invoiceDefault } from '@constants/finance'

const Bordered = styled.div<{ margin?: string; width?: string }>`
  border: 1px solid ${colors.gray.light};
  height: 100%;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 1rem 0.5rem;
  margin: ${({ margin }) => (margin ? margin : '0')};
  width: ${({ width }) => (width ? width : '100%')};
`

interface IState {
  createInvoiceTasks: ICustomerTask[]
  invoicedTasks: ICustomerTask[]
  nonBillableTasks: ICustomerTask[]
}

const EstimateTab = ({ customerId }) => {
  const {
    data: customerTasksData,
    isLoading: customerTasksIsLoading,
    refetch: r1
  } = useGetTasksByCustomerIdQuery(customerId)
  const { data: invoiceCategories, isLoading: invoiceCategoriesLoading } =
    useGetInvoiceCategoriesQuery(emptyQueryParams)
  const [reorder] = useReorderTasksMutation()
  const { data: invoices, isLoading: isInvoicesLoading } = useGetInvoicesQuery(customerId)
  const {
    data: expiredTaskSteps,
    isLoading: isExpiredTaskStepsLoading,
    refetch: r2
  } = useGetExpiredTaskStepsQuery(customerId)

  const [state, setState] = useState<IState>({
    createInvoiceTasks: [],
    invoicedTasks: [],
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
      const obj = customerTasksData.reduce<IState>(
        (acc, curr, i) => {
          if (curr.isInvoiced) {
            acc.invoicedTasks.push(curr)
            return acc
          }
          acc.nonBillableTasks.push(curr)
          return acc
        },
        { createInvoiceTasks: [], invoicedTasks: [], nonBillableTasks: [] }
      )
      console.log(obj.nonBillableTasks)
      obj.nonBillableTasks = obj.nonBillableTasks.sort((a, b) => {
        // @ts-ignore
        return a?.index - b?.index
      })
      console.log(obj.nonBillableTasks)
      obj.invoicedTasks = obj.invoicedTasks.sort((a, b) => {
        // @ts-ignore
        return a?.index - b?.index
      })
      setState(obj)
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
      <JustifyCenterRow margin="0 0 1rem 0" height="30%">
        <Bordered margin="0 4px 0 0" width="66%">
          <H1 color={colors.text.primary}>Invoices</H1>
          <Column height="100%">
            <InvoicesBarChart invoices={invoices} customerId={customerId} />
          </Column>
        </Bordered>
        <Bordered margin="0 0 0 8px" width="33%">
          <H1 color={colors.text.primary}>Non billable</H1>
          <JustifyCenterColumn height="100%">
            <H1 margin="0 0 1rem 0" textAlign="center" fontSize="32px" fontWeight="600" color={colors.teal.primary}>
              57%
            </H1>
            <ProgressBar startLabel="" completionColor={colors.teal.primary} completionPercentage={57} endLabel="" />
          </JustifyCenterColumn>
        </Bordered>
      </JustifyCenterRow>
      <JustifyCenterRow height="70%">
        <DragDropContext key="context" onDragEnd={onDragEnd}>
          <Bordered margin="0 12px 0 0" width="33%">
            <H1 color={colors.text.primary}>Invoiced</H1>
            <InvoicedList invoices={invoices} />
          </Bordered>
          <Bordered margin="0 12px 0 0" width="33%">
            <H1 color={colors.text.primary}>Expired Non billable</H1>
            <ExpiredTaskStepList expiredTaskSteps={expiredTaskStepsState.nonBillable} />
            <H1 color={colors.text.primary}>Non billable</H1>
            <NonBillableList nonBillableTasks={state.nonBillableTasks} />
          </Bordered>
          <Bordered width="33%">
            <H1 color={colors.text.primary}>Create invoice</H1>
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
