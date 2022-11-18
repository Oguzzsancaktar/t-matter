import React from 'react'
import { ItemContainer } from '@/components'
import styled from 'styled-components'
import NavbarItem from './NavbarItem'
import CompanyLogo from './CompanyLogo'
import { IWebsiteTextsData } from '@/models'

const NavbarLayout = styled.div`
  max-width: 1200px;
  width: 100%;
  height: 100%;
  margin: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ffce00;
  padding: 2rem;
`

const NavLinkList = styled.ul`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`
interface IProps {
  websiteTextsData: IWebsiteTextsData
}
const WebsiteNavbar: React.FC<IProps> = ({ websiteTextsData }) => {
  return (
    <ItemContainer position="fixed" top="1rem" left="0" height="60px" backgroundColor="transparent">
      <NavbarLayout>
        <ItemContainer width="200px" height="70px">
          <CompanyLogo url="https://1000logos.net/wp-content/uploads/2021/04/National-Geographic-logo.png" />
        </ItemContainer>
        <ItemContainer>
          <NavLinkList>
            {websiteTextsData.navlinks.map(
              (navlink, index) => navlink.show && <NavbarItem key={index}>{navlink.name}</NavbarItem>
            )}
          </NavLinkList>
        </ItemContainer>
      </NavbarLayout>
    </ItemContainer>
  )
}

export default WebsiteNavbar
