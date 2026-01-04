import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'
import { NewsProvider } from './Context/NewsContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <NewsProvider>
    <App />
    </NewsProvider>

)
