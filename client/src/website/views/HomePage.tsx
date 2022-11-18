import React from 'react'
import { ItemContainer, JustifyBetweenColumn } from '@/components'
import WebsiteNavbar from '../components/WebsiteNavbar'
import colors from '@/constants/colors'
import { CompanyInformationsSection, ModalButtonsSection } from '../components'
import { useGetWebsiteTextSettingsQuery } from '@/services/settings/website-settings/websiteSettingsService'

const HomePage = () => {
  const { data: websiteSettingsTextData, isLoading: websiteTextSettingsIsLoading } = useGetWebsiteTextSettingsQuery()

  if (!websiteSettingsTextData) {
    return <div>Loading...</div>
  }
  return (
    <ItemContainer
      backgroundColor={colors.primary.dark}
      width="calc(100% - 0rem)"
      height="calc(100% - 6rem)"
      borderRadius="0.8rem"
      overflow="hidden"
      position="relative"
      top="50%"
      transform="translateY(-50%)"
      maxWidth="1200px"
      margin="auto"
      padding="2rem"
    >
      <WebsiteNavbar websiteTextsData={websiteSettingsTextData} />
      <ItemContainer height="calc(100%)">
        <JustifyBetweenColumn height="100%">
          <ItemContainer margin="120px 0 0 0" maxWidth="1200px" height="calc(100% - 250px - 30px - 10rem)">
            <CompanyInformationsSection websiteTextsData={websiteSettingsTextData} />
          </ItemContainer>

          <ItemContainer margin="0 0 30px 0" height="250px" maxWidth="1200px">
            <ModalButtonsSection websiteTextsData={websiteSettingsTextData} />
          </ItemContainer>
        </JustifyBetweenColumn>
      </ItemContainer>
    </ItemContainer>
  )
}

export default HomePage
