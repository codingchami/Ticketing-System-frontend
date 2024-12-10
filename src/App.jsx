import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Customer from './components/Customer/CustomerSignup'
import Vendor from './components/Vendor/VendorSignup'
import ControlPanel from './assets/pages/Controlpanel/controlpanel'
import TicketPool from './assets/pages/Ticketpool/ticketpool'
import HomePage from './assets/pages/Home/home'

const App = () => {
  return (
    <div>
        <BrowserRouter>
            <Routes>
              <Route path='/customer' element={<Customer/>} />
              <Route path='/vendor' element={<Vendor/>} />
              <Route path='/controlpanel' element={<ControlPanel/>} />
              <Route path='/ticketpool' element={<TicketPool/>} />
              <Route path='/home' element={<HomePage/>} />
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
