import React from 'react'
import { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const DoctorAppointments = () => {

  const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])

  return (
    <div className='p-6 w-full max-w-6xl'>
      <div className='mb-6'>
        <span className='text-[11px] font-mono uppercase tracking-wider text-neutral-500'>Practitioner Schedule</span>
        <h1 className='text-2xl font-semibold text-neutral-950 tracking-tight'>Assigned Consultations</h1>
        <p className='text-xs text-neutral-500 mt-0.5'>List of patients booked for in-person or remote consultations.</p>
      </div>

      <div className='border border-neutral-200 bg-white rounded-lg shadow-whisper overflow-hidden text-xs'>
        <div className='hidden sm:grid grid-cols-[0.5fr_2fr_1.2fr_1fr_2.5fr_1fr_1.5fr] py-3.5 px-6 border-b border-neutral-200 bg-neutral-50/60 font-mono text-[11px] uppercase tracking-wider text-neutral-500'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fee</p>
          <p>Action</p>
        </div>

        <div className='divide-y divide-neutral-100 max-h-[75vh] overflow-y-auto'>
          {appointments.length === 0 ? (
            <div className='py-12 text-center text-neutral-400'>No assigned appointments.</div>
          ) : (
            appointments.map((item, index) => (
              <div className='flex flex-wrap justify-between max-sm:gap-3 sm:grid sm:grid-cols-[0.5fr_2fr_1.2fr_1fr_2.5fr_1fr_1.5fr] items-center text-neutral-600 py-3.5 px-6 hover:bg-neutral-50/70 transition-colors' key={index}>
                <p className='max-sm:hidden font-mono text-neutral-400'>{index + 1}</p>
                <div className='flex items-center gap-2'>
                  <img src={item.userData.image} className='w-7 h-7 rounded-full object-cover border border-neutral-200 bg-neutral-100' alt="" />
                  <p className='font-medium text-neutral-900'>{item.userData.name}</p>
                </div>
                <div>
                  <span className='font-mono text-[10px] font-medium border border-neutral-200 bg-neutral-50 text-neutral-700 px-2 py-0.5 rounded-md'>
                    {item.payment ? 'Online / Paid' : 'Cash on Visit'}
                  </span>
                </div>
                <p className='max-sm:hidden font-mono text-neutral-500'>{calculateAge(item.userData.dob)} yrs</p>
                <p className='font-mono text-neutral-700'>{slotDateFormat(item.slotDate)} at {item.slotTime}</p>
                <p className='font-mono font-semibold text-neutral-900'>${item.amount}</p>
                <div>
                  {item.cancelled ? (
                    <span className='px-2.5 py-0.5 rounded-md border border-red-200 bg-red-50 text-red-700 text-[10px] font-mono font-medium'>Cancelled</span>
                  ) : item.isCompleted ? (
                    <span className='px-2.5 py-0.5 rounded-md border border-neutral-200 bg-neutral-100 text-neutral-700 text-[10px] font-mono font-medium'>Completed</span>
                  ) : (
                    <div className='flex items-center gap-2'>
                      <button
                        onClick={() => cancelAppointment(item._id)}
                        className='border border-neutral-200 hover:border-red-200 bg-white hover:bg-red-50 hover:text-red-700 text-neutral-600 text-xs px-2 py-1 rounded-md transition-all'
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => completeAppointment(item._id)}
                        className='bg-neutral-900 hover:bg-black text-white text-xs px-2 py-1 rounded-md shadow-whisper transition-all'
                      >
                        Finish
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default DoctorAppointments