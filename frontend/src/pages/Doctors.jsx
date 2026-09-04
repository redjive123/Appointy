import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const specialities = [
  'General physician',
  'Gynecologist',
  'Dermatologist',
  'Pediatricians',
  'Neurologist',
  'Gastroenterologist'
]

const Doctors = () => {
  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  return (
    <div className='my-6'>
      <div className='mb-6'>
        <span className='text-[11px] font-mono uppercase tracking-wider text-neutral-500'>
          Clinical Directory
        </span>
        <h1 className='text-2xl sm:text-3xl font-semibold text-neutral-950 tracking-[-0.03em]'>
          All Specialists
        </h1>
        <p className='text-xs sm:text-sm text-neutral-500 mt-1'>
          Browse through accredited medical practitioners and filter by clinical specialty.
        </p>
      </div>

      <div className='flex flex-col sm:flex-row items-start gap-6'>
        {/* Mobile filter toggle */}
        <button
          onClick={() => setShowFilter(!showFilter)}
          className={`sm:hidden w-full py-2 px-3 border border-neutral-200 rounded-md text-xs font-medium transition-all flex items-center justify-between ${
            showFilter ? 'bg-neutral-900 text-white border-neutral-900' : 'bg-white text-neutral-700'
          }`}
        >
          <span>Filter by Speciality</span>
          <span className='font-mono text-[10px]'>{showFilter ? 'Close' : 'Expand'}</span>
        </button>

        {/* Sidebar Filters */}
        <div className={`w-full sm:w-64 flex-shrink-0 flex-col gap-1.5 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          <div className='border border-neutral-200 bg-white rounded-lg p-2 shadow-whisper flex flex-col gap-1'>
            <p className='text-[11px] font-mono uppercase tracking-wider text-neutral-400 px-3 py-1.5'>
              Specialities
            </p>
            <button
              onClick={() => navigate('/doctors')}
              className={`w-full text-left px-3 py-2 rounded-md text-xs font-medium transition-all ${
                !speciality
                  ? 'bg-neutral-900 text-white shadow-sm'
                  : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
              }`}
            >
              All Specialities
            </button>
            {specialities.map((item, index) => (
              <button
                key={index}
                onClick={() => speciality === item ? navigate('/doctors') : navigate(`/doctors/${item}`)}
                className={`w-full text-left px-3 py-2 rounded-md text-xs font-medium transition-all flex items-center justify-between ${
                  speciality === item
                    ? 'bg-neutral-900 text-white shadow-sm'
                    : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                }`}
              >
                <span>{item}</span>
                {speciality === item && <span className='w-1.5 h-1.5 rounded-full bg-white'></span>}
              </button>
            ))}
          </div>
        </div>

        {/* Doctors Grid */}
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {filterDoc.length === 0 ? (
            <div className='col-span-full py-16 text-center border border-dashed border-neutral-300 rounded-lg bg-white p-8'>
              <p className='text-sm text-neutral-500 font-medium'>No doctors found in this specialty.</p>
              <button onClick={() => navigate('/doctors')} className='mt-3 text-xs font-mono text-neutral-900 underline'>View all doctors</button>
            </div>
          ) : (
            filterDoc.map((item, index) => (
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
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Doctors
