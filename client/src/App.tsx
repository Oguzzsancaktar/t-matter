import React, { Suspense, lazy, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { PrivateRoute } from '@routes/PrivateRoute'
import GlobalStyle from './styles/GlobalStyle'
import { GlobalModal, ItemContainer, MinimizedModal, MinimizedModalsBar, SideBar } from '@components/index'
import useAccessStore from '@/hooks/useAccessStore'
import { selectMinimizedModals, selectOpenModals, selectUser } from '@/store'
import { useAuth } from '@hooks/useAuth'
import ReactTooltip from 'react-tooltip'
import { io, Socket } from 'socket.io-client'
import './styles/vendors/fullcalendar.css'
import './styles/vendors/react-drag-drop-file.css'
import './styles/vendors/apex.css'
import { setOnlineUsers } from '@store/online-users'
import { setSocket } from '@store/online-users/socketGlobal'

const SettingsPage = lazy(() => import('./pages/settings/SettingsPage'))

const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const CustomersPage = lazy(() => import('./pages/CustomersPage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))

function App() {
  const { useAppSelector, useAppDispatch } = useAccessStore()
  const { loggedUser } = useAuth()
  const openModals = useAppSelector(selectOpenModals)
  const minimizedModals = useAppSelector(selectMinimizedModals)
  const user = useAppSelector(selectUser)

  let socket: Socket | null = null
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!user) {
      if (socket) {
        socket.disconnect()
        socket = null
      }
      return
    }
    if (socket) {
      return
    }
    socket = io(process.env.NODE_ENV === 'production' ? window.location.origin : 'http://localhost:5000', {
      query: {
        userId: user._id,
        organization: 'futurePurpose'
      }
    })
    dispatch(setSocket(socket))
    socket.on('online', data => {
      dispatch(setOnlineUsers(data.onlineUsers))
    })
    return () => {
      socket?.disconnect()
    }
  }, [loggedUser])

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GlobalStyle />
      <ReactTooltip className="tooltip-z-index" />

      {openModals.map((modal, index) => (
        <GlobalModal key={index} modal={modal} />
      ))}
      {minimizedModals.length > 0 && (
        <MinimizedModalsBar>
          {minimizedModals.map((modal, index) => (
            <MinimizedModal key={index} modal={modal} />
          ))}
        </MinimizedModalsBar>
      )}

      {loggedUser.accessToken && <SideBar />}

      <ItemContainer height="100vh" width="calc(100vw - 48px - 2rem)" margin="0 0 0 auto">
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <SettingsPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/customers"
            element={
              <PrivateRoute>
                <CustomersPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />

          <Route path="/*" element={<Navigate replace to="/" />} />
        </Routes>
      </ItemContainer>

      <ToastContainer />
    </Suspense>
  )
}

export default App
