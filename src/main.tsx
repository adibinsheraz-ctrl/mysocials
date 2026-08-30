import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Firebase loaded after page is idle
if ('requestIdleCallback' in window) {
  requestIdleCallback(() => import('./firebase'))
} else {
  setTimeout(() => import('./firebase'), 200)
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
