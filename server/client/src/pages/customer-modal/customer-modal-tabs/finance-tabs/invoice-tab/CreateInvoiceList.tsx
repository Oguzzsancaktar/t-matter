import React from 'react'
import { ICustomerTask } from '@/models'
import { H1, JustifyBetweenRow } from '@/components'
import colors from '@constants/colors'
import styled from 'styled-components'

interface IProps {
  createInvoiceTasks?: ICustomerTask[]
}

const Item = styled(JustifyBetweenRow)`
  padding: 0.5rem 1rem;
  border: 1px solid #e0e0e0;
  background: ${colors.background.gray.light};
  margin-bottom: 0.5rem;
`

const CreateInvoiceList: React.FC<IProps> = ({ createInvoiceTasks }) => {
  return (
    <div style={{ marginTop: '1rem' }}>
      {createInvoiceTasks?.map((task, index) => {
        return (
          <Item key={index}>
            <H1 color={colors.black.primary}>{task.name}</H1>
            <H1 color={colors.black.primary} textAlign="end">
              ${task.totalPrice}
            </H1>
          </Item>
        )
      })}
    </div>
  )
}

export default CreateInvoiceList
