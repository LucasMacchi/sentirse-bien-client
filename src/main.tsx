import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@emotion/react'
import theme from './Theme/theme.ts'
//Componentes
import App from './App.tsx'
//Estados
import GlobalState from './Context/GlobalState.tsx'
import './index.css'
import { CssBaseline } from '@mui/material'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <CssBaseline>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <GlobalState>
            <App />
          </GlobalState>
        </BrowserRouter>
      </ThemeProvider>
    </React.StrictMode>,
  </CssBaseline>
)
