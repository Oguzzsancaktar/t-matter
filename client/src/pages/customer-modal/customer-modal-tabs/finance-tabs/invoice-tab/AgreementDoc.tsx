import React, { useState } from 'react'
import { Invoice } from '@/models'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'
import { List } from 'react-virtualized'
import { Button, IconButton } from '@/components'
import colors from '@constants/colors'
import { Printer } from 'react-feather'

interface IProps {
  invoice?: Invoice
}

const AgreementDoc: React.FC<IProps> = ({ invoice }) => {
  const [numPages, setNumPages] = useState(null)

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
  }

  return (
    <div>
      <Document file={invoice?.category.agreement} onLoadSuccess={onDocumentLoadSuccess}>
        <List
          height={350}
          width={400}
          rowHeight={450}
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
