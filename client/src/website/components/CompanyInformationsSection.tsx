import React from 'react'
import { Button, Column, H1, ItemContainer, JustifyBetweenRow } from '@/components'
import ContactItem from './ContactItem'
import styled from 'styled-components'
import colors from '@/constants/colors'
import CompanyLogo from './CompanyLogo'
import { IWebsiteTextsData } from '@/models'

const BorderedButton = styled(Button)`
  background-color: transparent;
  border-radius: 0;
`

const FlexEndColumn = styled(Column)`
  display: flex;
  justify-content: flex-end;
`

interface IProps {
  websiteTextsData: IWebsiteTextsData
}

const CompanyInformationsSection: React.FC<IProps> = ({ websiteTextsData }) => {
  return (
    <ItemContainer height="100%" width="100%">
      <JustifyBetweenRow height="100%" width="100%">
        <ItemContainer width="300px" height="100%">
          <FlexEndColumn>
            <ItemContainer>
              <H1 fontSize="2rem" color={colors.white.secondary} fontFamily="Satoshi-Bold">
                {websiteTextsData.informationHeader}
              </H1>
            </ItemContainer>

            <ItemContainer margin="1rem 0">
              <H1 fontSize="0.8rem" color={colors.white.primary} fontFamily="Satoshi-Light">
                {websiteTextsData.informationDescription}
              </H1>
            </ItemContainer>

            <ItemContainer margin="2rem 0 0 0">
              <BorderedButton color={'#ffce00'}>
                <H1
                  textAlign="center"
                  color={colors.white.secondary}
                  fontFamily="Satoshi-Light"
                  fontWeight="100"
                  cursor="pointer"
                >
                  {websiteTextsData.informationButtonText}
                </H1>
              </BorderedButton>
            </ItemContainer>
          </FlexEndColumn>
        </ItemContainer>

        <ItemContainer width="calc(100% - 300px - 300px - 2rem)" height="100%">
          <CompanyLogo
            url={'https://www.kitapmatik.com.tr/u/kitapmatik/img/c/k/a/kapak-0222-tr2-2-696x1016-1644227975.jpg'}
          />
        </ItemContainer>

        <ItemContainer width="300px" height="100%">
          <Column height="100%">
            {websiteTextsData.contactInformations.map((contact, index) => (
              <ContactItem key={index} icon={contact.icon} title={contact.title} content={contact.content} />
            ))}
          </Column>
        </ItemContainer>
      </JustifyBetweenRow>
    </ItemContainer>
  )
}

export default CompanyInformationsSection
