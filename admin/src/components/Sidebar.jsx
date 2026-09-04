import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'

const Sidebar = () => {

  const { dToken } = useContext(DoctorContext)
  const { aToken } = useContext(AdminContext)

  return (
    <aside className='min-h-[calc(100vh-60px)] bg-white border-r border-neutral-200'>
      {aToken && <ul className='text-neutral-600 mt-4 flex flex-col gap-1 px-2'>
        <NavLink to={'/admin-dashboard'} className={({ isActive }) => `flex items-center gap-3 py-2.5 px-3 md:px-5 md:min-w-64 rounded-md cursor-pointer text-xs font-medium transition-colors ${isActive ? 'bg-neutral-100 text-neutral-950 font-semibold' : 'hover:bg-neutral-50 hover:text-neutral-900'}`}>
          <img className='w-4 h-4' src={assets.home_icon} alt='' />
          <p className='hidden md:block'>Overview Dashboard</p>
        </NavLink>
        <NavLink to={'/all-appointments'} className={({ isActive }) => `flex items-center gap-3 py-2.5 px-3 md:px-5 md:min-w-64 rounded-md cursor-pointer text-xs font-medium transition-colors ${isActive ? 'bg-neutral-100 text-neutral-950 font-semibold' : 'hover:bg-neutral-50 hover:text-neutral-900'}`}>
          <img className='w-4 h-4' src={assets.appointment_icon} alt='' />
          <p className='hidden md:block'>All Appointments</p>
        </NavLink>
        <NavLink to={'/add-doctor'} className={({ isActive }) => `flex items-center gap-3 py-2.5 px-3 md:px-5 md:min-w-64 rounded-md cursor-pointer text-xs font-medium transition-colors ${isActive ? 'bg-neutral-100 text-neutral-950 font-semibold' : 'hover:bg-neutral-50 hover:text-neutral-900'}`}>
          <img className='w-4 h-4' src={assets.add_icon} alt='' />
          <p className='hidden md:block'>Register Physician</p>
        </NavLink>
        <NavLink to={'/doctor-list'} className={({ isActive }) => `flex items-center gap-3 py-2.5 px-3 md:px-5 md:min-w-64 rounded-md cursor-pointer text-xs font-medium transition-colors ${isActive ? 'bg-neutral-100 text-neutral-950 font-semibold' : 'hover:bg-neutral-50 hover:text-neutral-900'}`}>
          <img className='w-4 h-4' src={assets.people_icon} alt='' />
          <p className='hidden md:block'>Medical Staff</p>
        </NavLink>
      </ul>}

      {dToken && <ul className='text-neutral-600 mt-4 flex flex-col gap-1 px-2'>
        <NavLink to={'/doctor-dashboard'} className={({ isActive }) => `flex items-center gap-3 py-2.5 px-3 md:px-5 md:min-w-64 rounded-md cursor-pointer text-xs font-medium transition-colors ${isActive ? 'bg-neutral-100 text-neutral-950 font-semibold' : 'hover:bg-neutral-50 hover:text-neutral-900'}`}>
          <img className='w-4 h-4' src={assets.home_icon} alt='' />
          <p className='hidden md:block'>Clinical Dashboard</p>
        </NavLink>
        <NavLink to={'/doctor-appointments'} className={({ isActive }) => `flex items-center gap-3 py-2.5 px-3 md:px-5 md:min-w-64 rounded-md cursor-pointer text-xs font-medium transition-colors ${isActive ? 'bg-neutral-100 text-neutral-950 font-semibold' : 'hover:bg-neutral-50 hover:text-neutral-900'}`}>
          <img className='w-4 h-4' src={assets.appointment_icon} alt='' />
          <p className='hidden md:block'>Patient Visits</p>
        </NavLink>
        <NavLink to={'/doctor-profile'} className={({ isActive }) => `flex items-center gap-3 py-2.5 px-3 md:px-5 md:min-w-64 rounded-md cursor-pointer text-xs font-medium transition-colors ${isActive ? 'bg-neutral-100 text-neutral-950 font-semibold' : 'hover:bg-neutral-50 hover:text-neutral-900'}`}>
          <img className='w-4 h-4' src={assets.people_icon} alt='' />
          <p className='hidden md:block'>Doctor Profile</p>
        </NavLink>
      </ul>}
    </aside>
  )
}

export default Sidebar