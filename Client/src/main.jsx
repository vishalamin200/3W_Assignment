import './index.css'

import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <>
    <App />
    <Toaster />
  </>,
)
