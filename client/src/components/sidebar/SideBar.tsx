import React from 'react'
import { Link } from 'react-router-dom'
import { Column, H1, ItemContainer, JustifyBetweenColumn, Row, SearchCustomersModal } from '@components/index'
import { useAuth } from '@/hooks/useAuth'
import colors from '@/constants/colors'
import { Calendar, DollarSign, File, Home, MapPin, Package, Power, Search, Settings, UserCheck } from 'react-feather'
import styled from 'styled-components'
import CircleImage from '../image/CircleImage'
import { ESize } from '@/models'
import { openModal } from '@/store'
import useAccessStore from '@/hooks/useAccessStore'
import CalendarModal from '../modals/general/CalendarModal'
import { FinanceModal } from '@/components'

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
  width: 30px;
  height: 30px;
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
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const { loggedUser, logout } = useAuth()

  const openSearchCustomersModal = () => {
    dispatch(
      openModal({
        id: `searchCustomersModal`,
        title: 'Search Customers Modal',
        body: <SearchCustomersModal />,
        width: ESize.WLarge,
        height: ESize.HMedium,
        maxWidth: ESize.WMedium
      })
    )
  }

  const handleOpenCalendar = () => {
    dispatch(
      openModal({
        id: `calendarModal`,
        title: 'Calendar Modal',

        body: <CalendarModal />,
        width: ESize.WXLarge,
        height: ESize.HLarge,
        maxWidth: ESize.WXLarge
      })
    )
  }

  const handleOpenFinance = () => {
    dispatch(
      openModal({
        id: `financeModal`,
        title: 'Finance Modal',
        body: <FinanceModal />,
        width: ESize.WXLarge,
        height: ESize.HLarge,
        maxWidth: ESize.WXLarge
      })
    )
  }

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
                      <CircleImage height="35px" width="35px" imageUrl={loggedUser.user?.profile_img || ''} />
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
                      <Home size={20} />
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

              <ItemContainer>
                <Column>
                  <ItemContainer margin="0 0 0.5rem 0">
                    <Link to="/customers">
                      <Row width="100%">
                        <SidebarIcon>
                          <UserCheck size={20} />
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

                  <ItemContainer margin="0 0 0.5rem 0">
                    <Link to="/workflow">
                      <Row width="100%">
                        <SidebarIcon>
                          <Package size={20} />
                        </SidebarIcon>
                        <ItemContainer margin="0 0 0 0.5rem" width="calc(100% - 40px - 0.5rem)">
                          <SidebarShowWhenHover className="sidebar__hover_hide_show">
                            <H1 cursor="pointer" color="white">
                              Workflow
                            </H1>
                          </SidebarShowWhenHover>
                        </ItemContainer>
                      </Row>
                    </Link>
                  </ItemContainer>

                  <ItemContainer margin="0 0 0.5rem 0" onClick={handleOpenCalendar}>
                    <Row width="100%">
                      <SidebarIcon>
                        <Calendar size={20} />
                      </SidebarIcon>
                      <ItemContainer margin="0 0 0 0.5rem" width="calc(100% - 40px - 0.5rem)">
                        <SidebarShowWhenHover className="sidebar__hover_hide_show">
                          <H1 cursor="pointer" color="white">
                            Calendar
                          </H1>
                        </SidebarShowWhenHover>
                      </ItemContainer>
                    </Row>
                  </ItemContainer>

                  <ItemContainer margin="0 0 0.5rem 0">
                    <Link to="/location">
                      <Row width="100%">
                        <SidebarIcon>
                          <MapPin size={20} />
                        </SidebarIcon>
                        <ItemContainer margin="0 0 0 0.5rem" width="calc(100% - 40px - 0.5rem)">
                          <SidebarShowWhenHover className="sidebar__hover_hide_show">
                            <H1 cursor="pointer" color="white">
                              Location
                            </H1>
                          </SidebarShowWhenHover>
                        </ItemContainer>
                      </Row>
                    </Link>
                  </ItemContainer>

                  <ItemContainer margin="0 0 0.5rem 0" onClick={handleOpenFinance}>
                    <Link to="/finance">
                      <Row width="100%">
                        <SidebarIcon>
                          <DollarSign size={20} />
                        </SidebarIcon>
                        <ItemContainer margin="0 0 0 0.5rem" width="calc(100% - 40px - 0.5rem)">
                          <SidebarShowWhenHover className="sidebar__hover_hide_show">
                            <H1 cursor="pointer" color="white">
                              Finance
                            </H1>
                          </SidebarShowWhenHover>
                        </ItemContainer>
                      </Row>
                    </Link>
                  </ItemContainer>

                  <ItemContainer margin="0 0 0.5rem 0">
                    <Link to="/file">
                      <Row width="100%">
                        <SidebarIcon>
                          <File size={20} />
                        </SidebarIcon>
                        <ItemContainer margin="0 0 0 0.5rem" width="calc(100% - 40px - 0.5rem)">
                          <SidebarShowWhenHover className="sidebar__hover_hide_show">
                            <H1 cursor="pointer" color="white">
                              File
                            </H1>
                          </SidebarShowWhenHover>
                        </ItemContainer>
                      </Row>
                    </Link>
                  </ItemContainer>
                </Column>
              </ItemContainer>

              <ItemContainer margin="0 0 0.5rem 0" width="100%" onClick={openSearchCustomersModal.bind(this)}>
                <Row width="100%">
                  <SidebarIcon>
                    <Search size={20} />
                  </SidebarIcon>

                  <ItemContainer margin="0 0 0 0.25rem" width="calc(100% - 40px)">
                    <SidebarShowWhenHover className="sidebar__hover_hide_show">
                      <H1 cursor="pointer" color="white">
                        Search
                      </H1>
                    </SidebarShowWhenHover>
                  </ItemContainer>
                </Row>
              </ItemContainer>
            </Column>
          </ItemContainer>

          <ItemContainer>
            <Column>
              <ItemContainer margin="0 0 0.5rem 0">
                <Link to="/settings">
                  <Row width="100%">
                    <SidebarIcon>
                      <Settings size={20} />
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
                    <Power size={20} />
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
