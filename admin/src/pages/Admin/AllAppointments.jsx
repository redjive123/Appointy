import React, { useEffect } from 'react'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AllAppointments = () => {

  const { aToken, appointments, cancelAppointment, getAllAppointments } = useContext(AdminContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  return (
    <div className='p-6 w-full max-w-6xl'>
      <div className='mb-6'>
        <span className='text-[11px] font-mono uppercase tracking-wider text-neutral-500'>Booking Ledger</span>
        <h1 className='text-2xl font-semibold text-neutral-950 tracking-tight'>All Appointments</h1>
        <p className='text-xs text-neutral-500 mt-0.5'>Complete record of all clinical bookings across the network.</p>
      </div>

      <div className='border border-neutral-200 bg-white rounded-lg shadow-whisper overflow-hidden text-xs'>
        <div className='hidden sm:grid grid-cols-[0.5fr_2.5fr_1fr_2.5fr_2.5fr_1fr_1fr] py-3.5 px-6 border-b border-neutral-200 bg-neutral-50/60 font-mono text-[11px] uppercase tracking-wider text-neutral-500'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Physician</p>
          <p>Fee</p>
          <p>Action</p>
        </div>

        <div className='divide-y divide-neutral-100 max-h-[75vh] overflow-y-auto'>
          {appointments.length === 0 ? (
            <div className='py-12 text-center text-neutral-400'>No appointments recorded in the system.</div>
          ) : (
            appointments.map((item, index) => (
              <div className='flex flex-wrap justify-between max-sm:gap-3 sm:grid sm:grid-cols-[0.5fr_2.5fr_1fr_2.5fr_2.5fr_1fr_1fr] items-center text-neutral-600 py-3.5 px-6 hover:bg-neutral-50/70 transition-colors' key={index}>
                <p className='max-sm:hidden font-mono text-neutral-400'>{index + 1}</p>
                <div className='flex items-center gap-2'>
                  <img src={item.userData.image} className='w-7 h-7 rounded-full object-cover border border-neutral-200 bg-neutral-100' alt="" />
                  <p className='font-medium text-neutral-900'>{item.userData.name}</p>
                </div>
                <p className='max-sm:hidden font-mono text-neutral-500'>{calculateAge(item.userData.dob)} yrs</p>
                <p className='font-mono text-neutral-700'>{slotDateFormat(item.slotDate)} at {item.slotTime}</p>
                <div className='flex items-center gap-2'>
                  <img src={item.docData.image} className='w-7 h-7 rounded-full object-cover border border-neutral-200 bg-neutral-100' alt="" />
                  <p className='font-medium text-neutral-900'>{item.docData.name}</p>
                </div>
                <p className='font-mono font-semibold text-neutral-900'>${item.amount}</p>
                <div>
                  {item.cancelled ? (
                    <span className='px-2.5 py-0.5 rounded-md border border-red-200 bg-red-50 text-red-700 text-[10px] font-mono font-medium'>Cancelled</span>
                  ) : item.isCompleted ? (
                    <span className='px-2.5 py-0.5 rounded-md border border-neutral-200 bg-neutral-100 text-neutral-700 text-[10px] font-mono font-medium'>Completed</span>
                  ) : (
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className='border border-neutral-200 hover:border-red-200 bg-white hover:bg-red-50 hover:text-red-700 text-neutral-600 text-[11px] px-2.5 py-1 rounded-md transition-all'
                    >
                      Cancel
                    </button>
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

export default AllAppointments