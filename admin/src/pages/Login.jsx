import axios from 'axios'
import React, { useContext, useState } from 'react'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'

const Login = () => {

  const [state, setState] = useState('Admin')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const { setDToken } = useContext(DoctorContext)
  const { setAToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => { 
    event.preventDefault();

    if (state === 'Admin') {

      const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
      if (data.success) {
        setAToken(data.token)
        localStorage.setItem('aToken', data.token)
      } else {
        toast.error(data.message)
      }

    } else {

      const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
      if (data.success) {
        setDToken(data.token)
        localStorage.setItem('dToken', data.token)
      } else {
        toast.error(data.message)
      }

    }

  }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[75vh] flex items-center justify-center py-12'>
      <div className='flex flex-col gap-4 m-auto items-start p-8 w-full max-w-sm border border-neutral-200 bg-white rounded-lg text-neutral-600 text-xs shadow-whisper'>
        <div>
          <span className='text-[10px] font-mono uppercase tracking-wider text-neutral-400'>Administrative Access</span>
          <h1 className='text-2xl font-semibold text-neutral-950 tracking-tight mt-0.5'>
            {state} Console
          </h1>
          <p className='text-xs text-neutral-500 mt-1'>
            Authenticate to manage appointments, staff profiles, and schedules.
          </p>
        </div>

        <div className='w-full'>
          <label className='font-medium text-neutral-700 block mb-1'>Administrative Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className='border border-neutral-200 bg-white rounded-md w-full px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all'
            type="email"
            placeholder={state === 'Admin' ? 'admin@appointy.health' : 'doctor@appointy.health'}
            required
          />
        </div>

        <div className='w-full'>
          <label className='font-medium text-neutral-700 block mb-1'>Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className='border border-neutral-200 bg-white rounded-md w-full px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all'
            type="password"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type='submit'
          className='bg-neutral-900 hover:bg-black text-white w-full py-2.5 mt-2 rounded-md text-xs font-medium shadow-whisper transition-all active:scale-[0.98]'
        >
          Authenticate as {state}
        </button>

        <div className='pt-2 border-t border-neutral-100 w-full text-center text-xs text-neutral-500'>
          {state === 'Admin' ? (
            <p>
              Switch to medical staff?{' '}
              <span onClick={() => setState('Doctor')} className='text-neutral-950 font-semibold cursor-pointer hover:underline'>
                Doctor Login
              </span>
            </p>
          ) : (
            <p>
              Switch to administrator?{' '}
              <span onClick={() => setState('Admin')} className='text-neutral-950 font-semibold cursor-pointer hover:underline'>
                Admin Login
              </span>
            </p>
          )}
        </div>
      </div>
    </form>
  )
}

export default Login