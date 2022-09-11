import React, { useState } from 'react'
import { JustifyBetweenRow, JustifyCenterColumn, JustifyCenterRow } from '@/components'
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
  padding: 1rem 0.5rem;
  margin: ${({ margin }) => (margin ? margin : '0')};
  width: ${({ width }) => (width ? width : '100%')};
`

interface IProps {
  customerId: string
}

const InvoiceTab: React.FC<IProps> = ({ customerId }) => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice>()
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
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
      <JustifyBetweenRow height={'calc(70% - 40px)'}>
        <JustifyCenterColumn></JustifyCenterColumn>
        <JustifyCenterColumn></JustifyCenterColumn>
        <JustifyCenterColumn>
          <Document file={selectedInvoice?.category.agreement} onLoadSuccess={onDocumentLoadSuccess}>
            <Page width={300} pageNumber={pageNumber} />
          </Document>
          <JustifyBetweenRow>
            <span onClick={() => setPageNumber(pageNumber - 1)}>Prev</span>
            <span>
              {pageNumber}/{numPages}
            </span>
            <span onClick={() => setPageNumber(pageNumber + 1)}>Next</span>
          </JustifyBetweenRow>
        </JustifyCenterColumn>
      </JustifyBetweenRow>
    </div>
  )
}

export default InvoiceTab
