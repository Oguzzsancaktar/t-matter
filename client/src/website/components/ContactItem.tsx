import React from 'react'
import { Column, H1, ItemContainer } from '@/components'
import { Row } from '@nextui-org/react'
import { AiOutlineClockCircle } from 'react-icons/ai'
import styled from 'styled-components'
import colors from '@/constants/colors'
import { selectIconWithText } from '@/utils/selectIconWithText'
import { IWebsiteStylesData } from '@/models'

const ContactContainer = styled(ItemContainer)`
  &:not(&:first-child) {
    margin-top: 2rem;
  }
`
const ContactRow = styled(Row)`
  align-items: center;
`

const ContactText = styled(H1)`
  display: flex;
  align-items: center;
  line-height: 100%;
`

interface IProps {
  icon: string
  title: string
  content: string
  websiteSettingsStyleData: IWebsiteStylesData
}

const ContactItem: React.FC<IProps> = ({ icon, title, content, websiteSettingsStyleData }) => {
  return (
    <ContactContainer>
      <Column>
        <ItemContainer>
          <ContactRow>
            <ItemContainer width="25px" height="25px" margin="0 0.5rem 0 0">
              {selectIconWithText(icon, '20px', websiteSettingsStyleData.contactIconColor.color)}
            </ItemContainer>

            <ItemContainer height="25px" width="calc(100% - 0.5rem - 25px)">
              <ContactText
                height="25px"
                width="100%"
                fontFamily="Satoshi-Light"
                fontWeight="100"
                color={websiteSettingsStyleData.contactTitleColor.color}
                fontSize="0.8rem"
              >
                {title}
              </ContactText>
            </ItemContainer>
          </ContactRow>
        </ItemContainer>

        <ItemContainer>
          <ContactText
            margin="0 0 0 calc(25px + 0.5rem)"
            fontFamily="Satoshi-Medium"
            fontWeight="400"
            fontSize="0.9rem"
            color={websiteSettingsStyleData.contactContentColor.color}
          >
            {content}
          </ContactText>
        </ItemContainer>
      </Column>
    </ContactContainer>
  )
}

export default ContactItem
