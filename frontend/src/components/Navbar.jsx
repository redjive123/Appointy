import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [showMenu, setShowMenu] = useState(false)
  const { token, setToken, userData } = useContext(AppContext)

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/login')
  }

  return (
    <nav className='flex items-center justify-between text-sm py-3 mb-6 border-b border-neutral-200/80 bg-white/80 backdrop-blur-sm sticky top-0 z-40'>
      <div onClick={() => navigate('/')} className="flex items-center gap-2 cursor-pointer select-none">
        <img
          src={assets.logo}
          alt="Appointy Logo"
          className="h-9 w-auto object-contain"
        />
      </div>

      <ul className='hidden md:flex items-center gap-8 text-[13px] font-medium text-neutral-600'>
        <li>
          <NavLink
            to='/'
            className={({ isActive }) =>
              `transition-colors hover:text-neutral-950 pb-1 ${
                isActive ? 'text-neutral-950 font-semibold border-b-2 border-neutral-950' : ''
              }`
            }
          >
            HOME
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/doctors'
            className={({ isActive }) =>
              `transition-colors hover:text-neutral-950 pb-1 ${
                isActive ? 'text-neutral-950 font-semibold border-b-2 border-neutral-950' : ''
              }`
            }
          >
            ALL DOCTORS
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/about'
            className={({ isActive }) =>
              `transition-colors hover:text-neutral-950 pb-1 ${
                isActive ? 'text-neutral-950 font-semibold border-b-2 border-neutral-950' : ''
              }`
            }
          >
            ABOUT
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/contact'
            className={({ isActive }) =>
              `transition-colors hover:text-neutral-950 pb-1 ${
                isActive ? 'text-neutral-950 font-semibold border-b-2 border-neutral-950' : ''
              }`
            }
          >
            CONTACT
          </NavLink>
        </li>
      </ul>

      <div className='flex items-center gap-3'>
        {/* Admin Portal shortcut */}
        <button
          onClick={() => window.open('https://appointy-six.vercel.app', '_blank')}
          className='hidden sm:inline-flex items-center gap-1.5 border border-neutral-200 bg-white hover:bg-neutral-50 hover:border-neutral-300 text-neutral-700 text-xs font-medium px-3 py-1.5 rounded-md transition-all shadow-whisper'
        >
          <span className='w-1.5 h-1.5 rounded-full bg-emerald-500'></span>
          Admin Portal
        </button>

        {token && userData ? (
          <div className='flex items-center gap-2 cursor-pointer group relative'>
            <img className='w-9 h-9 rounded-full object-cover border border-neutral-200' src={userData.image || assets.profile_pic} alt="profile" />
            <img className='w-2.5 opacity-60 group-hover:opacity-100 transition-opacity' src={assets.dropdown_icon} alt="dropdown" />
            <div className='absolute top-full right-0 pt-2 text-sm text-neutral-700 z-50 hidden group-hover:block'>
              <div className='min-w-48 bg-white border border-neutral-200 rounded-md shadow-elevated py-1.5 divide-y divide-neutral-100'>
                <div className='px-4 py-2 border-b border-neutral-100'>
                  <p className='text-xs font-mono uppercase text-neutral-400'>Account</p>
                  <p className='font-medium text-neutral-900 truncate'>{userData.name || 'User'}</p>
                </div>
                <div className='py-1'>
                  <p onClick={() => navigate('my-profile')} className='px-4 py-2 hover:bg-neutral-50 cursor-pointer transition-colors'>My Profile</p>
                  <p onClick={() => navigate('my-appointments')} className='px-4 py-2 hover:bg-neutral-50 cursor-pointer transition-colors'>My Appointments</p>
                </div>
                <div className='py-1'>
                  <p onClick={logout} className='px-4 py-2 text-red-600 hover:bg-red-50 cursor-pointer transition-colors'>Logout</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className='bg-neutral-900 hover:bg-black text-white text-xs font-medium px-4 py-2 rounded-md shadow-whisper transition-all'
          >
            Create Account
          </button>
        )}

        <button
          onClick={() => setShowMenu(true)}
          className='p-1.5 rounded-md hover:bg-neutral-100 md:hidden border border-neutral-200'
          aria-label="Open menu"
        >
          <img className='w-5 h-5' src={assets.menu_icon} alt="" />
        </button>

        {/* Mobile Menu */}
        <div className={`md:hidden fixed inset-0 z-50 bg-neutral-950/20 backdrop-blur-sm transition-opacity ${showMenu ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className={`fixed right-0 top-0 bottom-0 w-3/4 max-w-sm bg-white p-6 shadow-2xl transition-transform duration-300 ${showMenu ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className='flex items-center justify-between pb-4 border-b border-neutral-100'>
              <img src={assets.logo} className='h-8 w-auto' alt="Appointy" />
              <button
                onClick={() => setShowMenu(false)}
                className='p-1 rounded-md hover:bg-neutral-100 text-neutral-500'
              >
                <img src={assets.cross_icon} className='w-5 h-5' alt="Close" />
              </button>
            </div>
            <ul className='flex flex-col gap-2 mt-6 text-sm font-medium'>
              <NavLink onClick={() => setShowMenu(false)} to='/' className={({ isActive }) => `px-3 py-2 rounded-md ${isActive ? 'bg-neutral-100 text-neutral-950 font-semibold' : 'text-neutral-600 hover:bg-neutral-50'}`}>HOME</NavLink>
              <NavLink onClick={() => setShowMenu(false)} to='/doctors' className={({ isActive }) => `px-3 py-2 rounded-md ${isActive ? 'bg-neutral-100 text-neutral-950 font-semibold' : 'text-neutral-600 hover:bg-neutral-50'}`}>ALL DOCTORS</NavLink>
              <NavLink onClick={() => setShowMenu(false)} to='/about' className={({ isActive }) => `px-3 py-2 rounded-md ${isActive ? 'bg-neutral-100 text-neutral-950 font-semibold' : 'text-neutral-600 hover:bg-neutral-50'}`}>ABOUT</NavLink>
              <NavLink onClick={() => setShowMenu(false)} to='/contact' className={({ isActive }) => `px-3 py-2 rounded-md ${isActive ? 'bg-neutral-100 text-neutral-950 font-semibold' : 'text-neutral-600 hover:bg-neutral-50'}`}>CONTACT</NavLink>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
