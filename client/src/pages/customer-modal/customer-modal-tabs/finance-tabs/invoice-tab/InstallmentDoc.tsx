import React from 'react'
import { Document, Page, PDFViewer, StyleSheet, Text, View } from '@react-pdf/renderer'

interface IProps {}

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

const InstallmentDoc: React.FC<IProps> = () => {
  return (
    <PDFViewer height={450} width="90%">
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>Section #1</Text>
          </View>
          <View style={styles.section}>
            <Text>Section #2</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  )
}

export default InstallmentDoc
