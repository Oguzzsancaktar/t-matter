import React, { useState } from 'react'
import { H1, JustifyBetweenRow, JustifyCenterColumn, JustifyCenterRow } from '@/components'
import { Document, Page, pdfjs } from 'react-pdf'
import colors from '@constants/colors'
import { AdditionalTimeDonut, InvoicesDonut, NonBillableCircleProgress, UnPaidInvoicesCircleProgress } from '@/pages'
import styled from 'styled-components'
import { Invoice } from '@/models'

const Bordered = styled.div<{ margin?: string; width?: string }>`
  border: 1px solid ${colors.gray.light};
  height: 100%;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 0.5rem;
  margin: ${({ margin }) => (margin ? margin : '0')};
  width: ${({ width }) => (width ? width : '100%')};
`
interface IProps {
  customerId: string
}

const InvoiceTab: React.FC<IProps> = ({ customerId }) => {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice>()

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
      <JustifyBetweenRow height={'calc(70% - 40px)'}>
        <JustifyCenterColumn margin="0 1rem 0 0">
          <Bordered>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <H1 textAlign="center" margin="0 0 0.5rem 0" color={colors.text.primary}>
                Invoice
              </H1>
            </div>
          </Bordered>
        </JustifyCenterColumn>
        <JustifyCenterColumn margin="0 1rem 0 0">
          <Bordered>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <H1 textAlign="center" margin="0 0 0.5rem 0" color={colors.text.primary}>
                Installments
              </H1>
            </div>
          </Bordered>
        </JustifyCenterColumn>
        <JustifyCenterColumn>
          <Bordered>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <H1 textAlign="center" margin="0 0 0.5rem 0" color={colors.text.primary}>
                Agreement
              </H1>
              <object
                style={{ minHeight: 460, width: '100%', maxWidth: 450 }}
                data={selectedInvoice?.category.agreement}
                type="application/pdf"
              >
                <iframe
                  sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals allow-popups-to-escape-sandbox"
                  src={`https://docs.google.com/viewer?url=${selectedInvoice?.category.agreement}&embedded=true`}
                ></iframe>
              </object>
            </div>
          </Bordered>
        </JustifyCenterColumn>
      </JustifyBetweenRow>
    </div>
  )
}

export default InvoiceTab
