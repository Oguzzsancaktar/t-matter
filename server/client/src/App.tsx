import React, { Suspense, lazy } from 'react'
import { Navigate } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { PrivateRoute } from '@routes/PrivateRoute'
import GlobalStyle from './styles/GlobalStyle'
import { GlobalModal, MinimizedModal, MinimizedModalsBar, SideBar } from '@components/index'
import useAccessStore from '@/hooks/useAccessStore'
import { selectMinimizedModals, selectOpenModals } from '@/store'
import { useAuth } from '@hooks/useAuth'

const SettingsPage = lazy(() => import('./pages/Settings/SettingsPage'))

const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const CustomersPage = lazy(() => import('./pages/CustomersPage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))

function App() {
  const { useAppDispatch, useAppSelector } = useAccessStore()
  const dispatch = useAppDispatch()
  const { loggedUser } = useAuth()
  const openModals = useAppSelector(selectOpenModals)
  const minimizedModals = useAppSelector(selectMinimizedModals)

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GlobalStyle />

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

      <ToastContainer />
    </Suspense>
  )
}

export default App
