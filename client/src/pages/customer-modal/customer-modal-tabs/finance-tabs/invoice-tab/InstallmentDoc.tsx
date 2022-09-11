import React from 'react'
import { Document, Page, PDFViewer, StyleSheet, Text, View } from '@react-pdf/renderer'
import { Invoice } from '@/models'
import { useGetInstallmentsQuery } from '@services/settings/finance-planning/financePlanningService'
import { H1 } from '@/components'
import colors from '@constants/colors'

interface IProps {
  invoiceId: Invoice['_id']
}

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#ffffff'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
})

const InstallmentDoc: React.FC<IProps> = ({ invoiceId }) => {
  const { data: installments } = useGetInstallmentsQuery(invoiceId)
  if (!installments) return <H1 color={colors.black.light}>loading</H1>
  return (
    <PDFViewer showToolbar height={450} width="100%">
      <Document>
        <Page size="A4" style={styles.page}>
          {installments?.map((installment, index) => (
            <>
              <View style={styles.section}>
                <Text>{installment.payDate}</Text>
              </View>
              <View style={styles.section}>
                <Text>${installment.payAmount}</Text>
              </View>
            </>
          ))}
        </Page>
      </Document>
    </PDFViewer>
  )
}

export default InstallmentDoc
