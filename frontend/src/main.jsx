import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import UsercontextProvider from './Pages/UsercontextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <UsercontextProvider>
    <BrowserRouter>
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>
  </UsercontextProvider>,
)
