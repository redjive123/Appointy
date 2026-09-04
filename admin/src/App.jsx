import React, { useContext, useEffect } from 'react'
import { DoctorContext } from './context/DoctorContext'
import { AdminContext } from './context/AdminContext'
import { Route, Routes, Navigate, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Admin/Dashboard'
import AllAppointments from './pages/Admin/AllAppointments'
import AddDoctor from './pages/Admin/AddDoctor'
import DoctorsList from './pages/Admin/DoctorsList'
import Login from './pages/Login'
import DoctorAppointments from './pages/Doctor/DoctorAppointments'
import DoctorDashboard from './pages/Doctor/DoctorDashboard'
import DoctorProfile from './pages/Doctor/DoctorProfile'

const App = () => {
  const { dToken } = useContext(DoctorContext)
  const { aToken } = useContext(AdminContext)
  const location = useLocation()

  // Redirect "/" to the proper dashboard
  if (location.pathname === '/') {
    if (aToken) return <Navigate to="/admin-dashboard" replace />
    if (dToken) return <Navigate to="/doctor-dashboard" replace />
  }

  // Admin layout and routes
  if (aToken) {
    return (
      <div className='bg-canvas min-h-screen text-neutral-900 font-sans antialiased'>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        <Navbar />
        <div className='flex items-start'>
          <Sidebar />
          <div className='flex-1 min-w-0'>
            <Routes>
              <Route path="/admin-dashboard" element={<Dashboard />} />
              <Route path="/all-appointments" element={<AllAppointments />} />
              <Route path="/add-doctor" element={<AddDoctor />} />
              <Route path="/doctor-list" element={<DoctorsList />} />
              <Route path="*" element={<Navigate to="/admin-dashboard" />} />
            </Routes>
          </div>
        </div>
      </div>
    )
  }

  // Doctor layout and routes
  if (dToken) {
    return (
      <div className='bg-canvas min-h-screen text-neutral-900 font-sans antialiased'>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        <Navbar />
        <div className='flex items-start'>
          <Sidebar />
          <div className='flex-1 min-w-0'>
            <Routes>
              <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
              <Route path="/doctor-appointments" element={<DoctorAppointments />} />
              <Route path="/doctor-profile" element={<DoctorProfile />} />
              <Route path="*" element={<Navigate to="/doctor-dashboard" />} />
            </Routes>
          </div>
        </div>
      </div>
    )
  }

  // No one is logged in
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App
