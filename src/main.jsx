import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import App from './App.jsx'
import theme from './theme'
import axios from 'axios'
import AuthProvider from './auth/AuthProvider.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CssBaseline from '@mui/material/CssBaseline'
import { app } from './firebase';
axios.interceptors.request.use(request => {
  // console.log(request)
  // request.headers['Authorization'] = 'Bearer ' + localStorage.getItem('accessToken')
  // Edit request config
  return request
}, error => {
  // console.log(error)
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  // console.log(response)
  // Edit response config
  return response
}, error => {
  // console.log(error)
  return Promise.reject(error)
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <CssVarsProvider theme={theme}>
    <BrowserRouter >
      <AuthProvider>
        <CssBaseline />
        <App />
        <ToastContainer
          limit={5}
          containerStyle={{
            zIndex: '9999 !important'
          }}
          toastOptions={{
            className: 'react-hot-toast',
            style: {
              zIndex: '9999 !important'
            }
          }} theme="colored" position="bottom-left" closeOnClick autoClose={2000} />
      </AuthProvider>
    </BrowserRouter>
  </CssVarsProvider>
)
