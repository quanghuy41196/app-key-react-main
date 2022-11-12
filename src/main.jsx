import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/css/index.css'
import {AuthProvider} from './contexts'
import { AppRoutes } from './routes/AppRoutes'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </React.StrictMode>
)
