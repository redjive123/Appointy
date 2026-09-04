import React, { useContext, useEffect } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const Dashboard = () => {

  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  return dashData && (
    <div className='p-6 w-full max-w-6xl'>
      <div className='mb-6'>
        <span className='text-[11px] font-mono uppercase tracking-wider text-neutral-500'>Overview</span>
        <h1 className='text-2xl font-semibold text-neutral-950 tracking-tight'>Administrator Console</h1>
        <p className='text-xs text-neutral-500 mt-0.5'>System-wide metrics and latest patient bookings.</p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
        <div className='flex items-center gap-4 bg-white p-5 rounded-lg border border-neutral-200 shadow-whisper hover:border-neutral-400 transition-all'>
          <div className='w-12 h-12 rounded-md bg-neutral-100 flex items-center justify-center p-2.5'>
            <img className='w-full h-full object-contain' src={assets.doctor_icon} alt="" />
          </div>
          <div>
            <p className='text-2xl font-semibold text-neutral-950 font-mono tracking-tight'>{dashData.doctors}</p>
            <p className='text-xs text-neutral-500 font-medium'>Registered Doctors</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-white p-5 rounded-lg border border-neutral-200 shadow-whisper hover:border-neutral-400 transition-all'>
          <div className='w-12 h-12 rounded-md bg-neutral-100 flex items-center justify-center p-2.5'>
            <img className='w-full h-full object-contain' src={assets.appointments_icon} alt="" />
          </div>
          <div>
            <p className='text-2xl font-semibold text-neutral-950 font-mono tracking-tight'>{dashData.appointments}</p>
            <p className='text-xs text-neutral-500 font-medium'>Total Bookings</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-white p-5 rounded-lg border border-neutral-200 shadow-whisper hover:border-neutral-400 transition-all'>
          <div className='w-12 h-12 rounded-md bg-neutral-100 flex items-center justify-center p-2.5'>
            <img className='w-full h-full object-contain' src={assets.patients_icon} alt="" />
          </div>
          <div>
            <p className='text-2xl font-semibold text-neutral-950 font-mono tracking-tight'>{dashData.patients}</p>
            <p className='text-xs text-neutral-500 font-medium'>Registered Patients</p>
          </div>
        </div>
      </div>

      <div className='mt-8 border border-neutral-200 bg-white rounded-lg overflow-hidden shadow-whisper'>
        <div className='flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-neutral-50/50'>
          <div className='flex items-center gap-2'>
            <img className='w-4 h-4 opacity-70' src={assets.list_icon} alt="" />
            <h2 className='text-sm font-semibold text-neutral-950'>Recent Consultations</h2>
          </div>
          <span className='text-xs font-mono text-neutral-400'>Latest 5 Bookings</span>
        </div>

        <div className='divide-y divide-neutral-100'>
          {dashData.latestAppointments.slice(0, 5).map((item, index) => (
            <div className='flex items-center px-6 py-3.5 gap-4 hover:bg-neutral-50/80 transition-colors' key={index}>
              <img className='w-9 h-9 rounded-full object-cover border border-neutral-200 bg-neutral-100' src={item.docData.image} alt="" />
              <div className='flex-1 text-xs'>
                <p className='text-neutral-900 font-semibold'>{item.docData.name}</p>
                <p className='text-neutral-500 font-mono text-[11px]'>Booking on {slotDateFormat(item.slotDate)} at {item.slotTime}</p>
              </div>
              <div>
                {item.cancelled ? (
                  <span className='px-2.5 py-0.5 rounded-md border border-red-200 bg-red-50 text-red-700 text-[10px] font-mono font-medium'>Cancelled</span>
                ) : item.isCompleted ? (
                  <span className='px-2.5 py-0.5 rounded-md border border-neutral-200 bg-neutral-100 text-neutral-700 text-[10px] font-mono font-medium'>Completed</span>
                ) : (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className='border border-neutral-200 hover:border-red-200 bg-white hover:bg-red-50 hover:text-red-700 text-neutral-600 text-xs px-2.5 py-1 rounded-md transition-all'
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard