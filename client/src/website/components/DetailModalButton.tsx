import { H1, ItemContainer, JustifyBetweenColumn } from '@/components'
import colors from '@/constants/colors'
import { IWebsiteTextsData } from '@/models'
import React from 'react'
import styled from 'styled-components'
import CompanyLogo from './CompanyLogo'

const Item = styled(ItemContainer)`
  border: 1px solid #ffce00;
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
}

const DetailModalButton: React.FC<IProps> = ({ header, text }) => {
  return (
    <Item backgroundColor={colors.white.secondary} height="100%">
      <JustifyBetweenColumn height="100%" padding="1rem">
        <H1 textAlign="center">{header}</H1>
        <ItemContainer height="80px">
          <CompanyLogo url="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Ford_logo_flat.svg/2560px-Ford_logo_flat.svg.png" />
        </ItemContainer>
        <H1 textAlign="center">{text}</H1>
      </JustifyBetweenColumn>
    </Item>
  )
}

export default DetailModalButton
