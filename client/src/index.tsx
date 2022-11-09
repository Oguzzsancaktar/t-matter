import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/index'
import AppRoute from './routes/AppRouter'
import 'react-toastify/dist/ReactToastify.css'
import './styles/index.css'
import './styles/vendors/react-select.css'
import './styles/vendors/timekeeper.css'
import './styles/vendors/react-data-table.css'
import './styles/vendors/draft.css'
import './styles/vendors/next-js.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <>
    <Provider store={store}>
      <AppRoute />
    </Provider>
  </>
)
