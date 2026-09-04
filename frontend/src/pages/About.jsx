import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className='my-6'>
      <div className='text-center max-w-2xl mx-auto mb-12'>
        <span className='text-[11px] font-mono uppercase tracking-wider text-neutral-500'>
          Clinical Infrastructure
        </span>
        <h1 className='text-3xl sm:text-4xl font-semibold text-neutral-950 tracking-[-0.03em] mt-1'>
          About Appointy
        </h1>
        <p className='text-xs sm:text-sm text-neutral-500 mt-2 leading-relaxed'>
          Engineering modern digital access to verified clinical care, reducing patient friction and streamlining medical coordination.
        </p>
      </div>

      <div className='my-10 grid grid-cols-1 md:grid-cols-12 gap-10 items-center'>
        <div className='md:col-span-5'>
          <img
            className='w-full h-80 sm:h-96 object-cover rounded-xl border border-neutral-200 bg-neutral-100 shadow-whisper'
            src={assets.about_image}
            alt="Modern clinic facility"
          />
        </div>
        <div className='md:col-span-7 flex flex-col gap-5 text-xs sm:text-sm text-neutral-600 leading-relaxed'>
          <p>
            Welcome to <strong className='text-neutral-900'>Appointy</strong>, a next-generation healthcare platform dedicated to making physician appointments effortless, transparent, and accessible. We bridge the operational gap between medical practitioners and patients through engineered simplicity.
          </p>
          <p>
            Built on robust web standards and secure authentication protocols, Appointy empowers patients with instant verification of clinical specialties, clear fee schedules, and direct calendar synchronization.
          </p>
          <div className='border-l-2 border-neutral-950 pl-4 py-1 my-2'>
            <p className='text-xs font-mono uppercase tracking-wider text-neutral-900 font-semibold'>
              Our Mission
            </p>
            <p className='text-xs sm:text-sm text-neutral-500 mt-1'>
              To eliminate administrative overhead in outpatient care and ensure every individual connects with the right specialist at the exact right moment.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className='my-16'>
        <div className='mb-6'>
          <span className='text-[11px] font-mono uppercase tracking-wider text-neutral-500'>Core Values</span>
          <h2 className='text-2xl font-semibold text-neutral-950 tracking-tight'>Why Choose Appointy</h2>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className='border border-neutral-200 bg-white rounded-lg p-6 shadow-whisper hover:border-neutral-400 transition-all flex flex-col gap-2.5'>
            <span className='font-mono text-xs text-neutral-400'>01</span>
            <h3 className='text-base font-semibold text-neutral-900'>Engineered Efficiency</h3>
            <p className='text-xs sm:text-sm text-neutral-500 leading-relaxed'>
              Real-time slot reservation directly synced with doctor availability. No phone tag or waiting rooms.
            </p>
          </div>

          <div className='border border-neutral-200 bg-white rounded-lg p-6 shadow-whisper hover:border-neutral-400 transition-all flex flex-col gap-2.5'>
            <span className='font-mono text-xs text-neutral-400'>02</span>
            <h3 className='text-base font-semibold text-neutral-900'>Verified Practitioners</h3>
            <p className='text-xs sm:text-sm text-neutral-500 leading-relaxed'>
              Rigorous credential verification for all listed physicians, ensuring peer-reviewed clinical quality.
            </p>
          </div>

          <div className='border border-neutral-200 bg-white rounded-lg p-6 shadow-whisper hover:border-neutral-400 transition-all flex flex-col gap-2.5'>
            <span className='font-mono text-xs text-neutral-400'>03</span>
            <h3 className='text-base font-semibold text-neutral-900'>Data Privacy & Security</h3>
            <p className='text-xs sm:text-sm text-neutral-500 leading-relaxed'>
              Enterprise-grade encryption and privacy-focused patient data handling designed for modern healthcare.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
