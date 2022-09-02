import React from 'react'
import { Column, H1, JustifyBetweenRow, JustifyCenterColumn, JustifyCenterRow } from '@/components'
import colors from '@constants/colors'
import { InvoicesBarChart, NonBillableCircleProgress, UnPaidInvoicesCircleProgress } from '@/pages'
import styled from 'styled-components'
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
const InvoiceTab: React.FC<IProps> = ({ customerId }) => {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '1rem' }}>
      <JustifyCenterRow margin="0 0 1rem 0" height="235px">
        <Bordered margin="0 4px 0 0" width="66%">
          <H1 color={colors.text.primary}>Invoices</H1>
          <Column height="100%">
            <InvoicesBarChart onSelectBar={invoice => {}} customerId={customerId} />
          </Column>
        </Bordered>
        <Bordered margin="0 0 0 8px" width="33%">
          <H1 color={colors.text.primary}>Non billable</H1>
          <JustifyBetweenRow height="100%">
            <NonBillableCircleProgress customerId={customerId} />
            <UnPaidInvoicesCircleProgress customerId={customerId} />
          </JustifyBetweenRow>
        </Bordered>
      </JustifyCenterRow>
      <JustifyCenterRow height={'calc(70% - 40px)'}></JustifyCenterRow>
    </div>
  )
}

export default InvoiceTab
