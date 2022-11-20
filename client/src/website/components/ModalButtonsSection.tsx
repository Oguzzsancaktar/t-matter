import React from 'react'
import { ItemContainer, JustifyBetweenRow } from '@/components'
import DetailModalButton from './DetailModalButton'
import { IWebsiteImageData, IWebsiteStylesData, IWebsiteTextsData } from '@/models'

interface IProps {
  websiteTextsData: IWebsiteTextsData
  websiteSettingsStyleData: IWebsiteStylesData
  websiteImageSettingsData: IWebsiteImageData
}
const ModalButtonsSection: React.FC<IProps> = ({
  websiteTextsData,
  websiteSettingsStyleData,
  websiteImageSettingsData
}) => {
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
            url={websiteImageSettingsData['modal_section_img_' + (index + 1)] as string}
          />
        ))}
      </JustifyBetweenRow>
    </ItemContainer>
  )
}

export default ModalButtonsSection
