import React from 'react'
import { H1, ItemContainer, JustifyBetweenColumn, JustifyCenterColumn, JustifyCenterRow, Row } from '@/components'
import { ModalBody, ModalHeader } from '@components/modals/types'
import colors from '@constants/colors'
import { FileUploader } from 'react-drag-drop-files'
import IInvoiceCategory from '@models/Entities/finance-plannin/IInvoiceCategory'
import { useUploadPdfToInvoiceCategoryMutation } from '@services/settings/finance-planning/financePlanningService'

interface IProps {
  invoiceCategory: IInvoiceCategory
}

const AgreementUploadModal: React.FC<IProps> = ({ invoiceCategory }) => {
  const [uploadPdf] = useUploadPdfToInvoiceCategoryMutation()

  const handleUploadChange = async file => {
    await uploadPdf({ _id: invoiceCategory._id, file })
  }

  return (
    <JustifyBetweenColumn height="100%">
      <ModalHeader>
        <ItemContainer>
          <JustifyCenterRow width="100%">
            <H1 margin="0" textAlign="center" fontWeight="700" color={colors.white.primary}>
              Agreement upload
            </H1>
          </JustifyCenterRow>
        </ItemContainer>
      </ModalHeader>

      <ModalBody>
        <ItemContainer>
          <JustifyCenterColumn padding="2rem 0">
            <FileUploader handleChange={handleUploadChange} name="file" types={['PDF']} />
          </JustifyCenterColumn>
        </ItemContainer>
      </ModalBody>
    </JustifyBetweenColumn>
  )
}

export default AgreementUploadModal
