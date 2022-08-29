import React, { useEffect, useState } from 'react'
import { JustifyCenterRow, H1, Column, ProgressBar, JustifyCenterColumn } from '@/components'
import styled from 'styled-components'
import { DragDropContext, DropResult, ResponderProvided } from 'react-beautiful-dnd'
import colors from '@constants/colors'
import { InvoicesBarChart, CreateInvoiceList, InvoicedList, NonBillableList } from '@/pages'
import { useGetTasksByCustomerIdQuery, useReorderTasksMutation } from '@services/customers/taskService'
import { ICustomerTask } from '@/models'
import { arrayMoveImmutable } from 'array-move'

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
  const { data: customerTasksData, isLoading: customerTasksIsLoading } = useGetTasksByCustomerIdQuery(customerId)
  const [reorder] = useReorderTasksMutation()
  const [state, setState] = useState<IState>({
    createInvoiceTasks: [],
    invoicedTasks: [],
    nonBillableTasks: []
  })

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

  if (customerTasksIsLoading) return <JustifyCenterRow>Loading...</JustifyCenterRow>

  const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
    const { destination, source, draggableId } = result
    if (destination?.droppableId === source.droppableId) {
      if (destination.index === source.index) {
        return
      }
      const arr = arrayMoveImmutable(state[destination.droppableId], source.index, destination.index) as ICustomerTask[]
      setState(s => {
        return {
          ...s,
          [destination.droppableId]: arr
        }
      })
      setTimeout(() => {
        const reorderd = [
          ...state.nonBillableTasks?.map((x, i) => ({ _id: x._id, index: i })),
          ...state.invoicedTasks?.map((x, i) => ({ _id: x._id, index: i }))
        ]
        reorder(reorderd)
      }, 0)
    }
    if (destination?.droppableId === 'createInvoiceTasks' && source.droppableId === 'nonBillableTasks') {
      const i = state.nonBillableTasks.findIndex(task => task._id === draggableId)
      const task = state.nonBillableTasks[i]
      const newNonBillableTasks = [...state.nonBillableTasks]
      newNonBillableTasks.splice(i, 1)
      const newCreateInvoiceTasks = [...state.createInvoiceTasks]
      newCreateInvoiceTasks.splice(destination.index, 0, task)
      setState({ ...state, createInvoiceTasks: newCreateInvoiceTasks, nonBillableTasks: newNonBillableTasks })
    }
    if (destination?.droppableId === 'nonBillableTasks' && source.droppableId === 'createInvoiceTasks') {
      const i = state.createInvoiceTasks.findIndex(task => task._id === draggableId)
      const task = state.createInvoiceTasks[i]
      const newCreateInvoiceTasks = [...state.createInvoiceTasks]
      newCreateInvoiceTasks.splice(i, 1)
      const newNonBillableTasks = [...state.nonBillableTasks]
      newNonBillableTasks.splice(destination.index, 0, task)
      setState({ ...state, createInvoiceTasks: newCreateInvoiceTasks, nonBillableTasks: newNonBillableTasks })
    }
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '1rem' }}>
      <JustifyCenterRow margin="0 0 1rem 0" height="30%">
        <Bordered margin="0 4px 0 0" width="66%">
          <H1 color={colors.text.primary}>Invoices</H1>
          <Column height="100%">
            <InvoicesBarChart />
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
            <InvoicedList invoicedTasks={state.invoicedTasks} />
          </Bordered>
          <Bordered margin="0 12px 0 0" width="33%">
            <H1 color={colors.text.primary}>Non billable</H1>
            <NonBillableList nonBillableTasks={state.nonBillableTasks} />
          </Bordered>
          <Bordered width="33%">
            <H1 color={colors.text.primary}>Create invoice</H1>
            <CreateInvoiceList createInvoiceTasks={state.createInvoiceTasks} />
          </Bordered>
        </DragDropContext>
      </JustifyCenterRow>
    </div>
  )
}

export default EstimateTab
