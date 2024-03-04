import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '@fortawesome/fontawesome-free/css/all.min.css'
import "@fontsource/inter"; // Defaults to weight 400
import "@fontsource/inter/400.css"; // Specify weight
//import "@fontsource/inter/400-italic.css"; // Specify weight and style
import './index.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <ToastContainer/>
    <App />
  </React.StrictMode>,
)
