// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'
import AppRoute from './routes/AppRoute.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppRoute />
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      closeOnClick
      pauseOnHover
    />
  </BrowserRouter>
)