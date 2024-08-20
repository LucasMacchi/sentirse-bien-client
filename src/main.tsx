import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
//Componentes
import App from './App.tsx'
//Estados
import GlobalState from './Context/GlobalState.tsx'
import './index.css'
import { CssBaseline } from '@mui/material'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <CssBaseline>
    <React.StrictMode>
      <BrowserRouter>
        <GlobalState>
          <App />
        </GlobalState>
      </BrowserRouter>
    </React.StrictMode>,
  </CssBaseline>
)
