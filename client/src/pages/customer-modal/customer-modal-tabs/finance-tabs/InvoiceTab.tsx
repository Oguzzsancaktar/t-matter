import React, { useState } from 'react'
import { H1, JustifyBetweenRow, JustifyCenterColumn, JustifyCenterRow } from '@/components'
import colors from '@constants/colors'
import {
  AdditionalTimeDonut,
  AgreementDoc,
  InstallmentDoc,
  InvoiceDoc,
  InvoicesDonut,
  NonBillableCircleProgress,
  UnPaidInvoicesCircleProgress
} from '@/pages'
import styled from 'styled-components'
import { Invoice } from '@/models'

const Bordered = styled.div<{ margin?: string; width?: string }>`
  border: 1px solid #ccc;
  height: 100%;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 0.5rem;
  margin: ${({ margin }) => (margin ? margin : '0')};
  width: ${({ width }) => (width ? width : '100%')};
`
interface IProps {
  customerId: string
  selectedInvoice?: Invoice
  handleSelectedInvoiceChange: (invoice: Invoice) => void
}

const InvoiceTab: React.FC<IProps> = ({ customerId, handleSelectedInvoiceChange, selectedInvoice }) => {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '1rem' }}>
      <JustifyCenterRow margin="0 0 1rem 0" height="235px">
        <Bordered margin="0 0 0 8px" width="100%">
          <JustifyBetweenRow height="100%">
            <InvoicesDonut
              selectedInvoice={selectedInvoice}
              onSelect={handleSelectedInvoiceChange}
              customerId={customerId}
            />
            <AdditionalTimeDonut customerId={customerId} />
            <NonBillableCircleProgress customerId={customerId} />
            <UnPaidInvoicesCircleProgress customerId={customerId} />
          </JustifyBetweenRow>
        </Bordered>
      </JustifyCenterRow>
      <JustifyBetweenRow height={'calc(70% - 40px)'}>
        {!selectedInvoice && (
          <JustifyCenterColumn>
            <H1 width="auto" fontSize="2rem" color={colors.gray.disabled}>
              Select invoice to see documents
            </H1>
          </JustifyCenterColumn>
        )}
        {selectedInvoice && (
          <>
            <JustifyCenterColumn margin="0 1rem 0 0">
              <Bordered>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <H1 textAlign="center" margin="0 0 0.5rem 0" color={colors.text.primary}>
                    Invoice
                  </H1>
                </div>
                <JustifyCenterColumn>
                  <InvoiceDoc invoice={selectedInvoice} customerId={customerId} />
                </JustifyCenterColumn>
              </Bordered>
            </JustifyCenterColumn>
            <JustifyCenterColumn margin="0 1rem 0 0">
              <Bordered>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <H1 textAlign="center" margin="0 0 0.5rem 0" color={colors.text.primary}>
                    Installments
                  </H1>
                </div>
                <JustifyCenterColumn>
                  <InstallmentDoc invoice={selectedInvoice} customerId={customerId} />
                </JustifyCenterColumn>
              </Bordered>
            </JustifyCenterColumn>
            <JustifyCenterColumn>
              <Bordered>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <H1 textAlign="center" margin="0 0 0.5rem 0" color={colors.text.primary}>
                    Agreement
                  </H1>
                </div>
                <JustifyCenterColumn>
                  <AgreementDoc invoice={selectedInvoice} />
                </JustifyCenterColumn>
              </Bordered>
            </JustifyCenterColumn>
          </>
        )}
      </JustifyBetweenRow>
    </div>
  )
}

export default InvoiceTab
