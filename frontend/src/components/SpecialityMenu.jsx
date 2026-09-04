import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
    return (
        <section id='speciality' className='flex flex-col items-center gap-3 py-14'>
            <span className='text-[11px] font-mono uppercase tracking-wider text-neutral-500'>
                Clinical Disciplines
            </span>
            <h2 className='text-2xl sm:text-3xl font-semibold text-neutral-950 tracking-[-0.03em] text-center'>
                Find by Speciality
            </h2>
            <p className='text-xs sm:text-sm text-neutral-500 max-w-md text-center leading-relaxed'>
                Select a medical specialty to browse verified specialists and check real-time clinic schedules.
            </p>

            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-6 w-full'>
                {specialityData.map((item, index) => (
                    <Link
                        to={`/doctors/${item.speciality}`}
                        onClick={() => scrollTo(0, 0)}
                        className='flex flex-col items-center justify-center p-4 rounded-lg border border-neutral-200 bg-white hover:border-neutral-400 hover:shadow-whisper transition-all group text-center cursor-pointer'
                        key={index}
                    >
                        <div className='w-14 h-14 mb-2.5 flex items-center justify-center transition-transform group-hover:scale-105 duration-200'>
                            <img className='w-full h-full object-contain' src={item.image} alt={item.speciality} />
                        </div>
                        <p className='text-xs font-medium text-neutral-800 group-hover:text-neutral-950 transition-colors'>
                            {item.speciality}
                        </p>
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default SpecialityMenu