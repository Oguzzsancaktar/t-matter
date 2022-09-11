import React from 'react'
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer'
import { Invoice } from '@/models'
import { useGetCompanyInfoQuery } from '@services/settings/company-info/companyInfoService'

interface IProps {
  invoice?: Invoice
}

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: '15px 40px'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
})

const InvoiceDoc: React.FC<IProps> = ({ invoice }) => {
  const { data: companyInfo } = useGetCompanyInfoQuery()

  return (
    <PDFViewer showToolbar height={450} width="100%">
      <Document>
        <Page size="A4" style={styles.page}>
          <View>
            <Text>{companyInfo?.name}</Text>
          </View>
          <View>
            <View style={styles.section}>
              <Text>{invoice?.category.name}</Text>
            </View>
            <View style={styles.section}>
              <Text>Section #2</Text>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  )
}

export default InvoiceDoc
