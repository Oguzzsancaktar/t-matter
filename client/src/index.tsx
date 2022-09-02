import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import reportWebVitals from './reportWebVitals'
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
