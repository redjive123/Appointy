import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
    const navigate = useNavigate()

    return (
        <div className='relative overflow-hidden rounded-xl border border-neutral-200 bg-gradient-to-r from-neutral-900 to-neutral-950 text-white p-8 sm:p-12 lg:p-16 my-16 shadow-whisper'>
            {/* Subtle background glow */}
            <div className='absolute -top-24 right-1/4 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none' />

            <div className='relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center'>
                {/* Left Side */}
                <div className='md:col-span-7 flex flex-col items-start gap-4'>
                    <div className='inline-flex items-center gap-2 px-2.5 py-1 rounded-md border border-neutral-800 bg-neutral-900/80 text-[11px] font-mono uppercase tracking-wider text-neutral-400'>
                        <span className='w-1.5 h-1.5 rounded-full bg-blue-400'></span>
                        Seamless Access
                    </div>

                    <h2 className='text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-[-0.03em] leading-tight text-white'>
                        Book your clinical consultation <br /> with 100+ trusted specialists.
                    </h2>

                    <p className='text-xs sm:text-sm text-neutral-400 max-w-lg leading-relaxed'>
                        Create your patient account to easily manage doctor appointments, access medical receipts, and reschedule anytime.
                    </p>

                    <div className='flex items-center gap-3 pt-2'>
                        <button
                            onClick={() => { navigate('/login'); scrollTo(0, 0) }}
                            className='bg-white hover:bg-neutral-100 text-neutral-950 text-xs sm:text-sm font-medium px-5 py-2.5 rounded-md shadow-whisper transition-all active:scale-[0.98]'
                        >
                            Create free account
                        </button>
                        <button
                            onClick={() => { navigate('/doctors'); scrollTo(0, 0) }}
                            className='border border-neutral-700 hover:border-neutral-600 bg-neutral-900/50 hover:bg-neutral-900 text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-md transition-all'
                        >
                            Browse specialties
                        </button>
                    </div>
                </div>

                {/* Right Side */}
                <div className='hidden md:flex md:col-span-5 justify-center lg:justify-end'>
                    <div className='w-64 h-64 lg:w-72 lg:h-72 rounded-lg border border-neutral-800 bg-neutral-900/50 p-2 shadow-inner overflow-hidden'>
                        <img
                            className='w-full h-full object-cover object-center rounded-md'
                            src={assets.appointment_img}
                            alt="Appointment consultation"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner