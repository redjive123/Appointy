import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const DoctorDashboard = () => {

  const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, currency } = useContext(AppContext)


  useEffect(() => {

    if (dToken) {
      getDashData()
    }

  }, [dToken])

  return dashData && (
    <div className='p-6 w-full max-w-6xl'>
      <div className='mb-6'>
        <span className='text-[11px] font-mono uppercase tracking-wider text-neutral-500'>Practitioner Portal</span>
        <h1 className='text-2xl font-semibold text-neutral-950 tracking-tight'>Doctor Dashboard</h1>
        <p className='text-xs text-neutral-500 mt-0.5'>Clinical performance metrics and upcoming patient appointments.</p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
        <div className='flex items-center gap-4 bg-white p-5 rounded-lg border border-neutral-200 shadow-whisper hover:border-neutral-400 transition-all'>
          <div className='w-12 h-12 rounded-md bg-neutral-100 flex items-center justify-center p-2.5'>
            <img className='w-full h-full object-contain' src={assets.earning_icon} alt="" />
          </div>
          <div>
            <p className='text-2xl font-semibold text-neutral-950 font-mono tracking-tight'>${dashData.earnings}</p>
            <p className='text-xs text-neutral-500 font-medium'>Total Earnings</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-white p-5 rounded-lg border border-neutral-200 shadow-whisper hover:border-neutral-400 transition-all'>
          <div className='w-12 h-12 rounded-md bg-neutral-100 flex items-center justify-center p-2.5'>
            <img className='w-full h-full object-contain' src={assets.appointments_icon} alt="" />
          </div>
          <div>
            <p className='text-2xl font-semibold text-neutral-950 font-mono tracking-tight'>{dashData.appointments}</p>
            <p className='text-xs text-neutral-500 font-medium'>Consultations</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-white p-5 rounded-lg border border-neutral-200 shadow-whisper hover:border-neutral-400 transition-all'>
          <div className='w-12 h-12 rounded-md bg-neutral-100 flex items-center justify-center p-2.5'>
            <img className='w-full h-full object-contain' src={assets.patients_icon} alt="" />
          </div>
          <div>
            <p className='text-2xl font-semibold text-neutral-950 font-mono tracking-tight'>{dashData.patients}</p>
            <p className='text-xs text-neutral-500 font-medium'>Unique Patients</p>
          </div>
        </div>
      </div>

      <div className='mt-8 border border-neutral-200 bg-white rounded-lg overflow-hidden shadow-whisper'>
        <div className='flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-neutral-50/50'>
          <div className='flex items-center gap-2'>
            <img className='w-4 h-4 opacity-70' src={assets.list_icon} alt="" />
            <h2 className='text-sm font-semibold text-neutral-950'>Upcoming Patient Consultations</h2>
          </div>
          <span className='text-xs font-mono text-neutral-400'>Next 5 Sessions</span>
        </div>

        <div className='divide-y divide-neutral-100'>
          {dashData.latestAppointments.slice(0, 5).map((item, index) => (
            <div className='flex items-center px-6 py-3.5 gap-4 hover:bg-neutral-50/80 transition-colors' key={index}>
              <img className='w-9 h-9 rounded-full object-cover border border-neutral-200 bg-neutral-100' src={item.userData.image} alt="" />
              <div className='flex-1 text-xs'>
                <p className='text-neutral-900 font-semibold'>{item.userData.name}</p>
                <p className='text-neutral-500 font-mono text-[11px]'>Session: {slotDateFormat(item.slotDate)} at {item.slotTime}</p>
              </div>
              <div>
                {item.cancelled ? (
                  <span className='px-2.5 py-0.5 rounded-md border border-red-200 bg-red-50 text-red-700 text-[10px] font-mono font-medium'>Cancelled</span>
                ) : item.isCompleted ? (
                  <span className='px-2.5 py-0.5 rounded-md border border-neutral-200 bg-neutral-100 text-neutral-700 text-[10px] font-mono font-medium'>Completed</span>
                ) : (
                  <div className='flex items-center gap-2'>
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className='border border-neutral-200 hover:border-red-200 bg-white hover:bg-red-50 hover:text-red-700 text-neutral-600 text-xs px-2.5 py-1 rounded-md transition-all'
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => completeAppointment(item._id)}
                      className='bg-neutral-900 hover:bg-black text-white text-xs px-2.5 py-1 rounded-md shadow-whisper transition-all'
                    >
                      Complete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard