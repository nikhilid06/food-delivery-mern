import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import StoreContextProvider from './context/StoreContext.jsx' // 1. Provider import karein

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StoreContextProvider> {/* 2. App ko wrap karein */}
      <App />
    </StoreContextProvider>
  </BrowserRouter>
)