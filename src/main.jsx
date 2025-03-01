//esme humne redux toolkit use kiya h uski command install ki h
//react router dom ki command install ki h
//react tost npm ki command use ki h
//tailwind css ki command use ki h


import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './Store.js'
import { Provider } from 'react-redux'

import { ToastContainer} from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  </StrictMode>,
)
