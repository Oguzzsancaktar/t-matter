import React, { Suspense, lazy, useEffect, useState, useCallback } from 'react'
import { Navigate } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { PrivateRoute } from '@routes/PrivateRoute'
import GlobalStyle from './styles/GlobalStyle'
import { GlobalModal, ItemContainer, MinimizedModal, MinimizedModalsBar, SideBar } from '@components/index'
import useAccessStore from '@/hooks/useAccessStore'
import { selectMinimizedModals, selectOpenModals, selectUser } from '@/store'
import ReactTooltip from 'react-tooltip'
import { io, Socket } from 'socket.io-client'
import './styles/vendors/fullcalendar.css'
import './styles/vendors/react-drag-drop-file.css'
import './styles/vendors/apex.css'
import { setOnlineUsers } from '@store/online-users'
import { setSocket } from '@store/online-users/socketGlobal'
import { useLogoutMutation } from '@services/authService'
import { isEqual } from 'lodash'
import { Freeze } from '@/components'
import { useCreateLogMutation } from '@services/userLogService'
import { LOG_TYPES } from '@constants/logTypes'
const SettingsPage = lazy(() => import('./pages/settings/SettingsPage'))

const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const CustomersPage = lazy(() => import('./pages/CustomersPage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))

function App() {
  const { useAppSelector, useAppDispatch } = useAccessStore()
  const openModals = useAppSelector(selectOpenModals)
  const minimizedModals = useAppSelector(selectMinimizedModals)
  const user = useAppSelector(selectUser)
  const [logout] = useLogoutMutation()
  const [createLog] = useCreateLogMutation()
  let socket: Socket | null = null
  const dispatch = useAppDispatch()
  const [isFreeze, setIsFreeze] = useState<Boolean | undefined>(undefined)

  useEffect(() => {
    if (!user) {
      return
    }
    if (typeof isFreeze === 'boolean' && isFreeze) {
      createLog({ logType: LOG_TYPES.LOGOUT, owner: user._id }).unwrap()
    }
    if (typeof isFreeze === 'boolean' && !isFreeze) {
      createLog({ logType: LOG_TYPES.LOGIN, owner: user._id }).unwrap()
    }
  }, [user, isFreeze])

  useEffect(() => {
    let timeout
    document.onmousemove = () => {
      clearTimeout(timeout)
      if (isFreeze) {
        setIsFreeze(false)
      }
      timeout = setTimeout(function () {
        if (!isFreeze) {
          setIsFreeze(true)
        }
      }, 10 * 1000)
    }
  }, [user, isFreeze])

  const alertUser = async e => {
    if (!user) {
      return ''
    }
    let x = true
    while (x) {
      createLog({ logType: LOG_TYPES.LOGOUT, owner: user._id }).unwrap()
      await logout({ isCookieNotRemoved: true }).unwrap()
      x = false
    }
    ;(e || window.event).returnValue = ''
    return ''
  }

  useEffect(() => {
    window.addEventListener('beforeunload', alertUser)
    return () => {
      window.removeEventListener('beforeunload', alertUser)
    }
  }, [])

  useEffect(() => {
    console.log(user)
    // @ts-ignore
    if (!user || isEqual(user, {})) {
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
  }, [user])

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {isFreeze && <Freeze />}
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

      {user && user._id && <SideBar />}

      <ItemContainer
        height="100vh"
        width={user && user._id ? 'calc(100vw - 48px - 2rem)' : '100vw'}
        margin="0 0 0 auto"
      >
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
