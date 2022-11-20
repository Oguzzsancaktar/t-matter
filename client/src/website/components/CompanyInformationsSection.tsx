import React from 'react'
import { Button, Column, H1, ItemContainer, JustifyBetweenRow } from '@/components'
import ContactItem from './ContactItem'
import styled from 'styled-components'
import CompanyLogo from './CompanyLogo'
import { IWebsiteImageData, IWebsiteStylesData, IWebsiteTextsData } from '@/models'

const Layout = styled(ItemContainer)`
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const InformationLayout = styled(ItemContainer)``

const InformationItem = styled(ItemContainer)`
  @media (max-width: 768px) {
    margin: 2rem 0;

    width: 100%;
  }
`

const BorderedButton = styled(Button)`
  background-color: transparent;
  border-radius: 0;
`

const FlexEndColumn = styled(Column)`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
    flex-direction: row;
  }
`

interface IProps {
  websiteTextsData: IWebsiteTextsData
  websiteSettingsStyleData: IWebsiteStylesData
  websiteImageSettingsData: IWebsiteImageData
}

const CompanyInformationsSection: React.FC<IProps> = ({
  websiteTextsData,
  websiteSettingsStyleData,
  websiteImageSettingsData
}) => {
  return (
    <ItemContainer height="100%" width="100%">
      <Layout height="100%" width="100%">
        <InformationItem width="calc((100% - 400px - 2rem)/2)" height="100%">
          <FlexEndColumn>
            <InformationLayout>
              <ItemContainer>
                <H1
                  fontSize="2rem"
                  color={websiteSettingsStyleData.informationHeaderTextColor.color}
                  fontFamily="Satoshi-Bold"
                >
                  {websiteTextsData.informationHeader}
                </H1>
              </ItemContainer>

              <ItemContainer margin="1rem 0">
                <H1
                  fontSize="0.8rem"
                  color={websiteSettingsStyleData.informationDescriptionTextColor.color}
                  fontFamily="Satoshi-Light"
                >
                  {websiteTextsData.informationDescription}
                </H1>
              </ItemContainer>
            </InformationLayout>

            <ItemContainer margin="2rem 0 0 0">
              <BorderedButton color={websiteSettingsStyleData.informationButtonTextColor.color}>
                <H1
                  textAlign="center"
                  color={websiteSettingsStyleData.informationButtonTextColor.color}
                  fontFamily="Satoshi-Light"
                  fontWeight="100"
                  cursor="pointer"
                >
                  {websiteTextsData.informationButtonText}
                </H1>
              </BorderedButton>
            </ItemContainer>
          </FlexEndColumn>
        </InformationItem>

        <InformationItem width="400px" height="100%">
          <CompanyLogo
            borderRadius={websiteSettingsStyleData.websiteImageBorderRadius}
            url={websiteImageSettingsData.company_img as string}
          />
        </InformationItem>

        <InformationItem width="calc((100% - 400px - 2rem)/2)" height="100%">
          <Column height="100%">
            {websiteTextsData.contactInformations.map((contact, index) => (
              <ContactItem
                key={index}
                icon={contact.icon}
                title={contact.title}
                content={contact.content}
                websiteSettingsStyleData={websiteSettingsStyleData}
              />
            ))}
          </Column>
        </InformationItem>
      </Layout>
    </ItemContainer>
  )
}

export default CompanyInformationsSection
