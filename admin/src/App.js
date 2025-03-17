import React from 'react'
import NavbarAdmin from './components/NavbarAdmin/NavbarAdmin'
import Sidebar from './components/Sidebar/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Summary from './pages/Summary/Summary'

const App = () => {
  const url = "http://localhost:4000"

  return (
    <div>
      <ToastContainer/>
      <NavbarAdmin/>
      <hr/>
      <div className='app-content'>
        <Sidebar/>
        <Routes>
          <Route path="/add" element={<Add url={url}/>}/>
          <Route path="/list" element={<List url={url}/>}/>
          <Route path="/orders" element={<Orders url={url}/>}/>
          <Route path="/summary" element={<Summary url={url}/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
