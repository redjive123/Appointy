import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()

    return (
        <section className='relative overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-whisper p-6 sm:p-10 lg:p-14 my-4'>
            {/* Vercel subtle mesh gradient blooms */}
            <div className='absolute -top-32 -left-32 w-80 h-80 bg-gradient-to-tr from-[#00dfd8]/20 via-[#007cf0]/20 to-[#7928ca]/20 rounded-full blur-3xl pointer-events-none' />
            <div className='absolute -bottom-32 right-1/4 w-96 h-96 bg-gradient-to-tl from-[#ff0080]/15 via-[#7928ca]/15 to-[#007cf0]/10 rounded-full blur-3xl pointer-events-none' />

            <div className='relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center'>
                {/* Left Column */}
                <div className='lg:col-span-7 flex flex-col items-start gap-4'>
                    <div className='inline-flex items-center gap-2 px-2.5 py-1 rounded-md border border-neutral-200 bg-neutral-50/90 text-[11px] font-mono uppercase tracking-wider text-neutral-700'>
                        <span className='w-1.5 h-1.5 rounded-full bg-emerald-500'></span>
                        VERIFIED HEALTHCARE PLATFORM
                    </div>

                    <h1 className='text-3xl sm:text-4xl lg:text-[46px] font-semibold text-neutral-950 tracking-[-0.04em] leading-[1.12]'>
                        Book clinical appointments <br className='hidden sm:inline' />
                        with trusted physicians.
                    </h1>

                    <p className='text-sm sm:text-base text-neutral-600 leading-relaxed max-w-xl font-normal'>
                        Connect directly with top specialists, check verified credentials, and confirm instant clinical bookings with zero administrative overhead.
                    </p>

                    {/* Patient community social proof */}
                    <div className='flex items-center gap-3 py-1'>
                        <img className='h-8 w-auto object-contain' src={assets.group_profiles} alt="Patients" />
                        <p className='text-xs text-neutral-500 font-medium'>
                            Trusted by <span className='text-neutral-900 font-semibold'>5,000+</span> patients across top clinics
                        </p>
                    </div>

                    {/* Action buttons (square / 6px rounded, avoiding pill shapes) */}
                    <div className='flex flex-wrap items-center gap-3 pt-2'>
                        <a
                            href='#speciality'
                            className='inline-flex items-center gap-2 bg-neutral-900 hover:bg-black text-white text-xs sm:text-sm font-medium px-5 py-2.5 rounded-md shadow-whisper transition-all active:scale-[0.98]'
                        >
                            <span>Book appointment</span>
                            <img className='w-3.5 invert' src={assets.arrow_icon} alt="" />
                        </a>
                        <button
                            onClick={() => navigate('/doctors')}
                            className='inline-flex items-center gap-2 border border-neutral-200 bg-white hover:bg-neutral-50 hover:border-neutral-300 text-neutral-700 text-xs sm:text-sm font-medium px-4 py-2.5 rounded-md transition-all shadow-whisper'
                        >
                            Browse all doctors
                        </button>
                    </div>
                </div>

                {/* Right Column / Visual */}
                <div className='lg:col-span-5 relative flex justify-center'>
                    <div className='relative w-full max-w-md rounded-lg border border-neutral-200/90 bg-neutral-50/50 p-2 shadow-sm overflow-hidden'>
                        <img
                            className='w-full h-72 sm:h-80 lg:h-96 object-cover rounded-md'
                            src={assets.header_img}
                            alt="Doctor consultation"
                        />
                        {/* Overlay micro-badge */}
                        <div className='absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md border border-neutral-200/80 rounded-md p-3 shadow-elevated flex items-center justify-between'>
                            <div className='flex items-center gap-2.5'>
                                <div className='w-2 h-2 rounded-full bg-emerald-500 animate-pulse'></div>
                                <div>
                                    <p className='text-xs font-semibold text-neutral-900'>Instant Online Confirmation</p>
                                    <p className='text-[11px] text-neutral-500'>Same-day & scheduled appointments</p>
                                </div>
                            </div>
                            <span className='text-[11px] font-mono text-neutral-400'>24/7</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Header