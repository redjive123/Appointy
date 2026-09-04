import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  return (
    <section className='flex flex-col items-center gap-3 my-16'>
      <span className='text-[11px] font-mono uppercase tracking-wider text-neutral-500'>
        Accredited Physicians
      </span>
      <h2 className='text-2xl sm:text-3xl font-semibold text-neutral-950 tracking-[-0.03em] text-center'>
        Top Doctors to Book
      </h2>
      <p className='text-xs sm:text-sm text-neutral-500 max-w-md text-center leading-relaxed'>
        Browse top-rated medical specialists and reserve verified consultation slots directly.
      </p>

      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-6'>
        {doctors.slice(0, 8).map((item, index) => (
          <div
            onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }}
            className='border border-neutral-200 bg-white rounded-lg overflow-hidden cursor-pointer hover:border-neutral-400 hover:shadow-whisper transition-all duration-200 group flex flex-col'
            key={index}
          >
            <div className='w-full h-52 bg-neutral-100 overflow-hidden relative'>
              <img
                className='w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300'
                src={item.image}
                alt={item.name}
              />
              <div className='absolute top-3 left-3 bg-white/95 backdrop-blur-sm border border-neutral-200/80 px-2 py-0.5 rounded-md flex items-center gap-1.5 shadow-sm'>
                <span className={`w-1.5 h-1.5 rounded-full ${item.available ? 'bg-emerald-500' : 'bg-neutral-400'}`}></span>
                <span className={`text-[10px] font-mono uppercase font-medium ${item.available ? 'text-emerald-700' : 'text-neutral-500'}`}>
                  {item.available ? 'Available' : 'Unavailable'}
                </span>
              </div>
            </div>

            <div className='p-4 flex flex-col flex-grow justify-between gap-2'>
              <div>
                <p className='text-sm font-semibold text-neutral-900 group-hover:text-black tracking-tight leading-snug'>
                  {item.name}
                </p>
                <p className='text-xs text-neutral-500 font-normal mt-0.5'>
                  {item.speciality}
                </p>
              </div>

              <div className='border-t border-neutral-100 pt-2 flex items-center justify-between text-xs font-mono text-neutral-600'>
                <span>{item.experience || '4+ Years'}</span>
                <span className='font-semibold text-neutral-900'>${item.fees}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => { navigate('/doctors'); scrollTo(0, 0) }}
        className='border border-neutral-300 hover:border-neutral-400 bg-white hover:bg-neutral-50 text-neutral-800 text-xs sm:text-sm font-medium px-6 py-2.5 rounded-md mt-8 shadow-whisper transition-all'
      >
        View all specialists
      </button>
    </section>
  )
}

export default TopDoctors
