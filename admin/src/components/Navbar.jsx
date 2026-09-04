import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { dToken, setDToken } = useContext(DoctorContext)
  const { aToken, setAToken } = useContext(AdminContext)
  const navigate = useNavigate()

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
