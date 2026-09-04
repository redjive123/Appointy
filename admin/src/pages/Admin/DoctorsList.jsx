import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {

  const { doctors , aToken , getAllDoctors, changeAvailability} = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
        getAllDoctors()
    }
}, [aToken])

  return (
    <div className='p-6 w-full max-w-6xl'>
      <div className='mb-6'>
        <span className='text-[11px] font-mono uppercase tracking-wider text-neutral-500'>Staff Directory</span>
        <h1 className='text-2xl font-semibold text-neutral-950 tracking-tight'>Medical Staff</h1>
        <p className='text-xs text-neutral-500 mt-0.5'>Manage physician availability and consultation profiles.</p>
      </div>

      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {doctors.map((item, index) => (
          <div className='border border-neutral-200 bg-white rounded-lg overflow-hidden shadow-whisper hover:border-neutral-400 transition-all duration-200 group flex flex-col' key={index}>
            <div className='w-full h-48 bg-neutral-100 overflow-hidden relative'>
              <img className='w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300' src={item.image} alt={item.name} />
              <div className='absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-sm border border-neutral-200/80 px-2 py-0.5 rounded-md flex items-center gap-1.5 shadow-sm'>
                <span className={`w-1.5 h-1.5 rounded-full ${item.available ? 'bg-emerald-500' : 'bg-neutral-400'}`}></span>
                <span className={`text-[10px] font-mono uppercase font-medium ${item.available ? 'text-emerald-700' : 'text-neutral-500'}`}>
                  {item.available ? 'Active' : 'Offline'}
                </span>
              </div>
            </div>

            <div className='p-4 flex flex-col flex-grow justify-between gap-3'>
              <div>
                <p className='text-sm font-semibold text-neutral-900 group-hover:text-black tracking-tight'>{item.name}</p>
                <p className='text-xs text-neutral-500 font-normal mt-0.5'>{item.speciality}</p>
              </div>

              <div className='pt-2 border-t border-neutral-100 flex items-center justify-between text-xs'>
                <label className='flex items-center gap-2 cursor-pointer select-none text-neutral-600 hover:text-neutral-900'>
                  <input
                    onChange={() => changeAvailability(item._id)}
                    type="checkbox"
                    checked={item.available}
                    className='rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900 cursor-pointer'
                  />
                  <span className='font-mono text-[11px]'>Accepting Visits</span>
                </label>
                <span className='font-mono text-xs text-neutral-400'>${item.fees}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorsList