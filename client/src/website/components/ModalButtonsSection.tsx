import React from 'react'
import { ItemContainer, JustifyBetweenRow } from '@/components'
import DetailModalButton from './DetailModalButton'
import { IWebsiteTextsData } from '@/models'

interface IProps {
  websiteTextsData: IWebsiteTextsData
}
const ModalButtonsSection: React.FC<IProps> = ({ websiteTextsData }) => {
  return (
    <ItemContainer height="100%" width="100%" borderRadius="0.3rem" overflow="hidden">
      <JustifyBetweenRow height="100%" width="100%">
        {websiteTextsData.modalSections.map((section, index) => (
          <DetailModalButton key={index} header={section.header} text={section.text} />
        ))}
      </JustifyBetweenRow>
    </ItemContainer>
  )
}

export default ModalButtonsSection
