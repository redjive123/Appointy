import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { useNavigate, useLocation } from 'react-router-dom'

const Navbar = () => {
  const { dToken, setDToken } = useContext(DoctorContext)
  const { aToken, setAToken } = useContext(AdminContext)
  const navigate = useNavigate()
  const location = useLocation()

  const logout = () => {
    navigate('/')
    dToken && setDToken('')
    dToken && localStorage.removeItem('dToken')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
  }

  const goToUserPanel = () => {
    window.location.href = 'https://appointy-roan.vercel.app/'
  }

  const isOnDashboard =
    location.pathname === '/admin-dashboard' ||
    location.pathname === '/doctor-dashboard'

  return (
    <nav className='flex justify-between items-center px-4 sm:px-8 py-3 border-b border-neutral-200 bg-white/80 backdrop-blur-sm sticky top-0 z-40'>
      <div className='flex items-center gap-3 text-xs'>
        {/* Logo */}
        <img
          onClick={() => navigate('/')}
          className='h-8 w-auto cursor-pointer object-contain'
          src={assets.admin_logo}
          alt="Appointy Admin"
        />

        {/* Role Badge */}
        <span className='border border-neutral-200 bg-neutral-100 text-neutral-800 text-[10px] font-mono uppercase font-semibold px-2 py-0.5 rounded-md'>
          {aToken ? 'Admin Console' : 'Doctor Portal'}
        </span>

        {/* User Panel Button */}
        {isOnDashboard && (
          <button
            onClick={goToUserPanel}
            className='hidden sm:inline-flex items-center gap-1.5 border border-neutral-200 bg-white hover:bg-neutral-50 hover:border-neutral-300 text-neutral-700 px-3 py-1.5 rounded-md text-xs font-medium shadow-whisper transition-all'
          >
            <span className='w-1.5 h-1.5 rounded-full bg-blue-500'></span>
            Patient Portal
          </button>
        )}
      </div>

      {/* Logout */}
      <button
        onClick={logout}
        className='bg-neutral-900 hover:bg-black text-white text-xs font-medium px-4 py-1.5 rounded-md shadow-whisper transition-all active:scale-[0.98]'
      >
        Sign Out
      </button>
    </nav>
  )
}

export default Navbar
