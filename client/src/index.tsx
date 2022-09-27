import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './store/index'
import AppRoute from './routes/AppRouter'
import 'react-toastify/dist/ReactToastify.css'
import './styles/index.css'
import './styles/vendors/react-select.css'
import './styles/vendors/timekeeper.css'
import './styles/vendors/react-data-table.css'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRoute />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
