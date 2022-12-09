import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import RouteProvider from './context/RouteContext'
import SelectedCollectorProvider from './context/SelectedCollectorContext'
import SelectedVehicleProvider from './context/SelectedVehicleContext'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <RouteProvider>
    <SelectedCollectorProvider>
    <SelectedVehicleProvider>
      <App />
    </SelectedVehicleProvider>
    </SelectedCollectorProvider>
    </RouteProvider>
    </BrowserRouter>
  </React.StrictMode>
)
