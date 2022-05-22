import React, { Suspense, lazy } from 'react'
import { Navigate } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { PrivateRoute } from '@routes/PrivateRoute'
import GlobalStyle from './styles/GlobalStyle'
import { GlobalModal, SideBar } from '@components/index'

const SettingsPage = lazy(() => import('./pages/SettingsPage'))
const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GlobalStyle />
      <GlobalModal />
      <SideBar />

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
