import React from 'react'
import { ItemContainer } from '@/components'
import styled from 'styled-components'
import NavbarItem from './NavbarItem'
import CompanyLogo from './CompanyLogo'
import { IWebsiteImageData, IWebsiteStylesData, IWebsiteTextsData } from '@/models'

const NavbarLayout = styled.div<{ borderColor: string }>`
  max-width: 1600px;
  width: 100%;
  height: 100%;
  margin: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${props => props.borderColor};
  padding: 2rem;
`

const NavLinkList = styled.ul`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`
interface IProps {
  websiteTextsData: IWebsiteTextsData
  websiteSettingsStyleData: IWebsiteStylesData
  websiteImageSettingsData: IWebsiteImageData
}
const WebsiteNavbar: React.FC<IProps> = ({ websiteTextsData, websiteSettingsStyleData, websiteImageSettingsData }) => {
  console.log('websiteSettingsStyleData', websiteSettingsStyleData)
  return (
    <ItemContainer position="fixed" top="1rem" left="0" height="60px" backgroundColor="transparent">
      <NavbarLayout borderColor={websiteSettingsStyleData.navbarBorderColor.color}>
        <ItemContainer width="200px" height="40px">
          <CompanyLogo url={websiteImageSettingsData.company_logo as string} />
        </ItemContainer>
        <ItemContainer>
          <NavLinkList>
            {websiteTextsData.navlinks.map(
              (navlink, index) =>
                navlink.show && (
                  <NavbarItem
                    key={index}
                    color={websiteSettingsStyleData?.navlinkTextColor?.color}
                    hoverColor={websiteSettingsStyleData?.navlinkHoverTextColor?.color}
                  >
                    {navlink.name}
                  </NavbarItem>
                )
            )}
          </NavLinkList>
        </ItemContainer>
      </NavbarLayout>
    </ItemContainer>
  )
}

export default WebsiteNavbar
