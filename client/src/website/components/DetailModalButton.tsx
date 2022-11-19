import { H1, ItemContainer, JustifyBetweenColumn } from '@/components'
import colors from '@/constants/colors'
import { IWebsiteStylesData, IWebsiteTextsData } from '@/models'
import React from 'react'
import styled from 'styled-components'
import CompanyLogo from './CompanyLogo'

const Item = styled(ItemContainer)<{ borderColor: string; borderWidth: string }>`
  border: ${props => props.borderWidth}px solid ${props => props.borderColor};
  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;

  &:first-child {
    border-left: 1px solid transparent;
  }

  &:last-child {
    border-right: 1px solid transparent;
  }
`

interface IProps {
  header: string
  text: string
  websiteSettingsStyleData: IWebsiteStylesData
}

const DetailModalButton: React.FC<IProps> = ({ header, text, websiteSettingsStyleData }) => {
  return (
    <Item
      backgroundColor={websiteSettingsStyleData.websiteModalButtonsBackgroundColor.color}
      borderColor={websiteSettingsStyleData.websiteModalButtonsBorderColor.color}
      borderWidth={`${websiteSettingsStyleData.websiteModalButtonsBorderWidth}`}
      height="100%"
    >
      <JustifyBetweenColumn height="100%" padding="1rem">
        <H1 textAlign="center" color={websiteSettingsStyleData.websiteModalTitleColor.color}>
          {header}
        </H1>
        <ItemContainer height="80px">
          <CompanyLogo url="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Ford_logo_flat.svg/2560px-Ford_logo_flat.svg.png" />
        </ItemContainer>
        <H1 textAlign="center" color={websiteSettingsStyleData.websiteModalContentColor.color}>
          {text}
        </H1>
      </JustifyBetweenColumn>
    </Item>
  )
}

export default DetailModalButton
