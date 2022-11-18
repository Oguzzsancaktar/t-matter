import React, { Suspense, lazy, useEffect, useState, useMemo } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
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
import { isEqual } from 'lodash'
import { Freeze } from '@/components'
import { useCreateLogMutation } from '@services/userLogService'
import { LOG_TYPES } from '@constants/logTypes'
import { Appointment, CheckInHome, DropOfDocuments, PickUpDocuments, NewConsultation } from '@pages/check-in-pages'
import moment from 'moment'
const SettingsPage = lazy(() => import('./pages/settings/SettingsPage'))

const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const CustomersPage = lazy(() => import('./pages/CustomersPage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const HomePage = lazy(() => import('./website/views/HomePage'))

function delay(ms) {
  var start = +new Date()
  while (+new Date() - start < ms);
}

function App() {
  const { useAppSelector, useAppDispatch } = useAccessStore()
  const openModals = useAppSelector(selectOpenModals)
  const minimizedModals = useAppSelector(selectMinimizedModals)
  const user = useAppSelector(selectUser)
  const [createLog] = useCreateLogMutation()
  let socket: Socket | null = null
  const dispatch = useAppDispatch()
  const [isFreeze, setIsFreeze] = useState<Boolean | undefined>(undefined)

  const location = useLocation()

  const isSidebarOpen = useMemo(() => (location.pathname !== '/' && user && user._id ? true : false), [location, user])

  useEffect(() => {
    if (!('Notification' in window)) {
      console.log('Browser does not support desktop notification')
    } else {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          console.log('Notification permission granted.')
        } else {
          alert('Please allow notification to use this app')
        }
      })
    }
  }, [])

  useEffect(() => {
    if (!user || isEqual(user, {})) {
      return
    }
    if (typeof isFreeze === 'boolean' && isFreeze) {
      createLog({ logType: LOG_TYPES.LOGOUT, owner: user._id }).unwrap()
      const n = new Notification('Click if you here', {
        vibrate: [200, 100, 200],
        body: 'Now you are offline please click this notification or move your mouse to online again',
        icon: 'https://res.cloudinary.com/de0xihdep/image/upload/v1668026524/Screen_Shot_2022-11-09_at_15.38.57_bjlqvy.png',
        tag: 'offline'
      })
      n.onclick = () => {
        if (isFreeze) {
          setIsFreeze(false)
          createLog({ logType: LOG_TYPES.LOGIN, owner: user._id }).unwrap()
          n.close()
        }
      }
    }
    if (typeof isFreeze === 'boolean' && !isFreeze) {
      createLog({ logType: LOG_TYPES.LOGIN, owner: user._id }).unwrap()
    }
  }, [user, isFreeze])
  let timeout
  useEffect(() => {
    document.onmousemove = e => {
      if (e.pageX === 0) {
        const sidebar = document.querySelector('.main-side-bar')
        sidebar?.classList.add('hover')
        setTimeout(() => {
          sidebar?.classList.remove('hover')
        }, 200)
      }
      clearTimeout(timeout)
      if (isFreeze) {
        setIsFreeze(false)
      }
      timeout = setTimeout(function () {
        if (!isFreeze) {
          setIsFreeze(true)
        }
      }, 30 * 60 * 1000)
    }
  }, [user, isFreeze])

  const alertUser = e => {
    if (!user || isEqual(user, {})) {
      return ''
    }
    createLog({ logType: LOG_TYPES.LOGOUT, owner: user._id }).unwrap()
    delay(1000)
    // this is needed to avoid to show a confirmation prompt
    delete e['returnValue']
  }

  useEffect(() => {
    window.addEventListener('beforeunload', alertUser)
    return () => {
      window.removeEventListener('beforeunload', alertUser)
    }
  }, [user])

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

      {isSidebarOpen && <SideBar />}

      <ItemContainer height="100vh" width={isSidebarOpen ? 'calc(100vw - 48px - 2rem)' : '100vw'} margin="0 0 0 auto">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/checkin" element={<CheckInHome />} />
          <Route path="/checkin/walk-in" element={<NewConsultation />} />
          <Route path="/checkin/appointment" element={<Appointment />} />
          <Route path="/checkin/drop-of-documents" element={<DropOfDocuments />} />
          <Route path="/checkin/pick-up-documents" element={<PickUpDocuments />} />
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
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />

          <Route path="/*" element={<Navigate replace to="/login" />} />
        </Routes>
      </ItemContainer>

      <ToastContainer />
    </Suspense>
  )
}

export default App
