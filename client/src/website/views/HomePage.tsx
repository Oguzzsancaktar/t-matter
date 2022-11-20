import React from 'react'
import { ItemContainer, JustifyBetweenColumn } from '@/components'
import WebsiteNavbar from '../components/WebsiteNavbar'
import { CompanyInformationsSection, ModalButtonsSection } from '../components'
import {
  useGetWebsiteImageSettingsQuery,
  useGetWebsiteStyleSettingsQuery,
  useGetWebsiteTextSettingsQuery
} from '@/services/settings/website-settings/websiteSettingsService'
import styled from 'styled-components'

const InformationSection = styled(ItemContainer)`
  @media (max-width: 768px) {
    height: auto;
  }
`

const HomePage = () => {
  const { data: websiteSettingsTextData, isLoading: websiteTextSettingsIsLoading } = useGetWebsiteTextSettingsQuery()
  const { data: websiteSettingsStyleData, isLoading: websiteStyleSettingsIsLoading } = useGetWebsiteStyleSettingsQuery()
  const { data: websiteImageSettingsData, isLoading: websiteImageSettingsIsLoading } = useGetWebsiteImageSettingsQuery()

  if (!websiteSettingsTextData || !websiteSettingsStyleData || !websiteImageSettingsData) {
    return <div>Loading...</div>
  }
  return (
    <ItemContainer width="100%" height="100%" backgroundColor={websiteSettingsStyleData.websitePaddingColor.color}>
      <ItemContainer
        backgroundColor={websiteSettingsStyleData.websiteBackgroundColor.color}
        width={`calc(100% - ${websiteSettingsStyleData.websitePaddingHorizontal}rem)`}
        height={`calc(100% - ${websiteSettingsStyleData.websitePaddingVertical}rem)`}
        borderRadius={`${websiteSettingsStyleData.websiteBorderRadius}rem`}
        overflow="hidden"
        position="relative"
        top="50%"
        transform="translateY(-50%)"
        maxWidth="1200px"
        margin="auto"
        padding="2rem"
      >
        <WebsiteNavbar
          websiteTextsData={websiteSettingsTextData}
          websiteSettingsStyleData={websiteSettingsStyleData}
          websiteImageSettingsData={websiteImageSettingsData}
        />
        <ItemContainer height="calc(100%)">
          <JustifyBetweenColumn height="100%">
            <InformationSection margin="120px 0 0 0" maxWidth="1200px" height="calc(100% - 250px - 30px - 10rem)">
              <CompanyInformationsSection
                websiteTextsData={websiteSettingsTextData}
                websiteSettingsStyleData={websiteSettingsStyleData}
                websiteImageSettingsData={websiteImageSettingsData}
              />
            </InformationSection>

            <ItemContainer margin="0 0 30px 0" height="250px" maxWidth="1200px">
              <ModalButtonsSection
                websiteTextsData={websiteSettingsTextData}
                websiteSettingsStyleData={websiteSettingsStyleData}
                websiteImageSettingsData={websiteImageSettingsData}
              />
            </ItemContainer>
          </JustifyBetweenColumn>
        </ItemContainer>
      </ItemContainer>
    </ItemContainer>
  )
}

export default HomePage
