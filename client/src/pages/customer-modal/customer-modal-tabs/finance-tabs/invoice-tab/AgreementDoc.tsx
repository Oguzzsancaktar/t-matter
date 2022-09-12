import React, { useState } from 'react'
import { Invoice } from '@/models'
import { Document, Page, pdfjs } from 'react-pdf/dist/esm/entry.webpack'
import { List } from 'react-virtualized'
import { Button, IconButton } from '@/components'
import colors from '@constants/colors'
import { Printer } from 'react-feather'

interface IProps {
  invoice?: Invoice
}

const AgreementDoc: React.FC<IProps> = ({ invoice }) => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
  const [numPages, setNumPages] = useState(null)

  if (!invoice || !invoice.category.agreement) {
    return <div style={{ maxHeight: 400, height: 400, overflowY: 'auto', width: '100%' }}></div>
  }

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
  }

  return (
    <div style={{ maxHeight: 400, height: 400, overflowY: 'auto', width: '100%' }}>
      <Document file={invoice?.category.agreement} onLoadSuccess={onDocumentLoadSuccess}>
        <List
          height={350}
          width={400}
          rowHeight={350}
          rowCount={numPages}
          rowRenderer={({ index, key, style }) => <Page key={key} style={style} pageNumber={index} />}
        />
      </Document>
      <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'row-reverse' }}>
        <IconButton
          width="30px"
          bgColor={colors.background.gray.light}
          onClick={e => {
            e.preventDefault()
            window.open(invoice?.category.agreement, 'PRINT', 'height=400,width=600')
          }}
          children={<Printer size={16} />}
        />
      </div>
    </div>
  )
}

export default AgreementDoc
