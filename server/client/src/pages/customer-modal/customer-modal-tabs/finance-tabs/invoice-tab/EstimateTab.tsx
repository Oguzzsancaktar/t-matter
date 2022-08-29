import React, { useEffect, useState } from 'react'
import { JustifyCenterRow, H1, Column, ProgressBar, JustifyCenterColumn } from '@/components'
import styled from 'styled-components'
import colors from '@constants/colors'
import { InvoicesBarChart, CreateInvoiceList, InvoicedList, NonBillableList } from '@/pages'
import { useGetTasksByCustomerIdQuery } from '@services/customers/taskService'
import { ICustomerTask } from '@/models'

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
      setState(obj)
    }
  }, [customerTasksData])

  if (customerTasksIsLoading) return <JustifyCenterRow>Loading...</JustifyCenterRow>

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
      </JustifyCenterRow>
    </div>
  )
}

export default EstimateTab
