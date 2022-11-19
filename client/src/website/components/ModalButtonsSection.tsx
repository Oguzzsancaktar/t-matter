import React from 'react'
import { ItemContainer, JustifyBetweenRow } from '@/components'
import DetailModalButton from './DetailModalButton'
import { IWebsiteStylesData, IWebsiteTextsData } from '@/models'

interface IProps {
  websiteTextsData: IWebsiteTextsData
  websiteSettingsStyleData: IWebsiteStylesData
}
const ModalButtonsSection: React.FC<IProps> = ({ websiteTextsData, websiteSettingsStyleData }) => {
  return (
    <ItemContainer
      height="100%"
      width="100%"
      borderRadius={websiteSettingsStyleData.websiteModalButtonsBorderRadius + 'px'}
      overflow="hidden"
    >
      <JustifyBetweenRow height="100%" width="100%">
        {websiteTextsData.modalSections.map((section, index) => (
          <DetailModalButton
            key={index}
            header={section.header}
            text={section.text}
            websiteSettingsStyleData={websiteSettingsStyleData}
          />
        ))}
      </JustifyBetweenRow>
    </ItemContainer>
  )
}

export default ModalButtonsSection
