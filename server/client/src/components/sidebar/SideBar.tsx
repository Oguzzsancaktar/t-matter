import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Column, H1, ItemContainer, JustifyBetweenColumn, JustifyCenterRow, Row, UserBadge } from '@components/index'
import { useAuth } from '@/hooks/useAuth'
import colors from '@/constants/colors'
import { Home, List, LogOut, Settings, User } from 'react-feather'
import styled from 'styled-components'

const SidebarIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 0.3rem;
  background-color: ${colors.red.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.3s ease-in-out background-color;
  &:hover {
    background-color: ${colors.green.primary};
  }
`

const SideBar = () => {
  const { loggedUser, logout } = useAuth()
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)

  const handleMouseOver = e => {
    setIsSideBarOpen(true)
  }
  const handleMouseOut = e => {
    setTimeout(() => {
      setIsSideBarOpen(false)
    }, 1000)
  }

  return (
    <ItemContainer
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      height="100vh"
      position="fixed"
      width={isSideBarOpen ? '250px' : 'calc(40px + 2rem)'}
      backgroundColor={colors.blue.primary}
      zIndex="99"
    >
      <JustifyBetweenColumn height="100%" padding="1rem">
        <ItemContainer>
          <Column>
            <ItemContainer margin="0 0 0.5rem 0">
              {isSideBarOpen ? (
                <ItemContainer>
                  {loggedUser.user && (
                    <UserBadge
                      userImage={'https:source.unsplash.com/user/c_v_r/100x100'}
                      userName={loggedUser.user?.firstname + loggedUser.user?.lastname}
                      userEmail={loggedUser.user?.email}
                    />
                  )}
                </ItemContainer>
              ) : (
                <SidebarIcon>
                  <User size={'30px'} />
                </SidebarIcon>
              )}
            </ItemContainer>

            <ItemContainer margin="0 0 0.5rem 0" width="100%">
              <Link to="/">
                <Row>
                  <SidebarIcon>
                    <Home size={30} />
                  </SidebarIcon>
                  {isSideBarOpen && <H1>Home</H1>}
                </Row>
              </Link>
            </ItemContainer>
          </Column>
        </ItemContainer>

        <ItemContainer>
          <Column>
            <ItemContainer margin="0 0 0.5rem 0" onMouseOver={handleMouseOver}>
              <Link to="/customers">
                <Row>
                  <SidebarIcon>
                    <List size={30} />
                  </SidebarIcon>
                  {isSideBarOpen && <H1>Customers</H1>}
                </Row>
              </Link>
            </ItemContainer>
          </Column>
        </ItemContainer>

        <ItemContainer>
          <Column>
            <ItemContainer margin="0 0 0.5rem 0" onMouseOver={handleMouseOver}>
              <Link to="/settings">
                <Row>
                  <SidebarIcon>
                    <Settings size={30} />
                  </SidebarIcon>
                  {isSideBarOpen && <H1>Settings</H1>}
                </Row>
              </Link>
            </ItemContainer>

            <ItemContainer onClick={logout}>
              <Row>
                <SidebarIcon>
                  <LogOut size={30} />
                </SidebarIcon>
                {isSideBarOpen && <H1>Logout</H1>}
              </Row>
            </ItemContainer>
          </Column>
        </ItemContainer>
      </JustifyBetweenColumn>
    </ItemContainer>
  )
}

export default SideBar
