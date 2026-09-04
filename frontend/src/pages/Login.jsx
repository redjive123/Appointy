import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext)
  const [state, setState] = useState('Sign Up')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try{
    if (state === 'Sign Up') {

      const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })

      if (data.success) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
      } else {
        toast.error(data.message)
      }

    } else {

      const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })

      if (data.success) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
      } else {
        toast.error(data.message)
      }

    }}catch(error){
      toast.error(error.message)
    }

  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[75vh] flex items-center justify-center py-12'>
      <div className='flex flex-col gap-4 m-auto items-start p-8 w-full max-w-sm border border-neutral-200 bg-white rounded-lg text-neutral-600 text-xs shadow-whisper'>
        <div>
          <span className='text-[10px] font-mono uppercase tracking-wider text-neutral-400'>Authentication</span>
          <h1 className='text-2xl font-semibold text-neutral-950 tracking-tight mt-0.5'>
            {state === 'Sign Up' ? 'Create Account' : 'Patient Login'}
          </h1>
          <p className='text-xs text-neutral-500 mt-1'>
            {state === 'Sign Up' ? 'Enter your details to register as a patient' : 'Sign in to access your consultations'}
          </p>
        </div>

        {state === 'Sign Up' && (
          <div className='w-full'>
            <label className='font-medium text-neutral-700 block mb-1'>Full Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className='border border-neutral-200 bg-white rounded-md w-full px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all'
              type="text"
              placeholder="e.g. Jane Doe"
              required
            />
          </div>
        )}

        <div className='w-full'>
          <label className='font-medium text-neutral-700 block mb-1'>Email Address</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className='border border-neutral-200 bg-white rounded-md w-full px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all'
            type="email"
            placeholder="patient@domain.com"
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
          {state === 'Sign Up' ? 'Create Account' : 'Sign In'}
        </button>

        <div className='pt-2 border-t border-neutral-100 w-full text-center text-xs text-neutral-500'>
          {state === 'Sign Up' ? (
            <p>
              Already registered?{' '}
              <span onClick={() => setState('Login')} className='text-neutral-950 font-semibold cursor-pointer hover:underline'>
                Sign in here
              </span>
            </p>
          ) : (
            <p>
              New patient?{' '}
              <span onClick={() => setState('Sign Up')} className='text-neutral-950 font-semibold cursor-pointer hover:underline'>
                Create account
              </span>
            </p>
          )}
        </div>
      </div>
    </form>
  )
}

export default Login