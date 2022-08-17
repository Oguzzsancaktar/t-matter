import React from 'react'
import { Link } from 'react-router-dom'
import { Column, H1, ItemContainer, JustifyBetweenColumn, Row, UserBadge } from '@components/index'
import { useAuth } from '@/hooks/useAuth'
import colors from '@/constants/colors'
import { Home, List, LogOut, Power, Settings, User } from 'react-feather'
import styled from 'styled-components'
import CircleImage from '../image/CircleImage'

const SidebarShowWhenHover = styled.div`
  color: ${colors.white.bg};
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  padding: 10px;
  cursor: pointer;
  max-width: 0;
  overflow: hidden;
  transition: 0.4s ease-in-out;
  opacity: 0;
  cursor: pointer;
  &:hover {
    color: ${colors.primary.light};
  }
`

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 80px;
  height: 100vh;
  background-color: ${colors.primary.dark};
  z-index: 10;
  transition: 0.4s ease-in-out width;
  &:hover {
    width: 200px;
  }

  &:hover .sidebar__hover_hide_show {
    max-width: 100%;
    opacity: 1;
  }
`

const SidebarIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 0.3rem;
  background-color: ${colors.primary.middle};
  color: ${colors.white.light};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.3s ease-in-out background-color;
  &:hover {
    background-color: ${colors.primary.light};
  }
`

const SideBar = () => {
  const { loggedUser, logout } = useAuth()

  return (
    <Sidebar>
      <ItemContainer height="100vh">
        <JustifyBetweenColumn height="100%" padding="1rem">
          <ItemContainer>
            <Column>
              {loggedUser.user && (
                <ItemContainer margin="0 0 0.5rem 0">
                  <Row>
                    <ItemContainer width="35px" margin="0 0.5rem 0 0">
                      <CircleImage
                        height="35px"
                        width="35px"
                        imageUrl={'https:source.unsplash.com/user/c_v_r/100x100'}
                      />
                    </ItemContainer>
                    <SidebarShowWhenHover className="sidebar__hover_hide_show">
                      <Column>
                        <H1 color={colors.white.primary}>{loggedUser.user?.firstname + loggedUser.user?.lastname}</H1>
                        <H1 color={colors.text.primary} fontSize={'0.8rem'}>
                          {loggedUser.user?.email}
                        </H1>
                      </Column>
                    </SidebarShowWhenHover>
                  </Row>
                </ItemContainer>
              )}

              <ItemContainer margin="0 0 0.5rem 0" width="100%">
                <Link to="/">
                  <Row width="100%">
                    <SidebarIcon>
                      <Home size={30} />
                    </SidebarIcon>

                    <ItemContainer margin="0 0 0 0.25rem" width="calc(100% - 40px)">
                      <SidebarShowWhenHover className="sidebar__hover_hide_show">
                        <H1 cursor="pointer" color="white">
                          Home
                        </H1>
                      </SidebarShowWhenHover>
                    </ItemContainer>
                  </Row>
                </Link>
              </ItemContainer>
            </Column>
          </ItemContainer>

          <ItemContainer>
            <Column>
              <ItemContainer margin="0 0 0.5rem 0">
                <Link to="/customers">
                  <Row width="100%">
                    <SidebarIcon>
                      <List size={30} />
                    </SidebarIcon>
                    <ItemContainer margin="0 0 0 0.5rem" width="calc(100% - 40px - 0.5rem)">
                      <SidebarShowWhenHover className="sidebar__hover_hide_show">
                        <H1 cursor="pointer" color="white">
                          Customers
                        </H1>
                      </SidebarShowWhenHover>
                    </ItemContainer>
                  </Row>
                </Link>
              </ItemContainer>
            </Column>
          </ItemContainer>

          <ItemContainer>
            <Column>
              <ItemContainer margin="0 0 0.5rem 0">
                <Link to="/settings">
                  <Row width="100%">
                    <SidebarIcon>
                      <Settings size={30} />
                    </SidebarIcon>
                    <ItemContainer margin="0 0 0 0.5rem" width="calc(100% - 40px - 0.5rem)">
                      <SidebarShowWhenHover className="sidebar__hover_hide_show">
                        <H1 cursor="pointer" color="white">
                          Settings
                        </H1>
                      </SidebarShowWhenHover>
                    </ItemContainer>
                  </Row>
                </Link>
              </ItemContainer>

              <ItemContainer onClick={logout}>
                <Row width="100%">
                  <SidebarIcon>
                    <Power size={30} />
                  </SidebarIcon>
                  <ItemContainer margin="0 0 0 0.5rem" width="calc(100% - 40px - 0.5rem)">
                    <SidebarShowWhenHover className="sidebar__hover_hide_show">
                      <H1 cursor="pointer" color="white">
                        Logout
                      </H1>
                    </SidebarShowWhenHover>
                  </ItemContainer>
                </Row>
              </ItemContainer>
            </Column>
          </ItemContainer>
        </JustifyBetweenColumn>
      </ItemContainer>
    </Sidebar>
  )
}

export default SideBar
