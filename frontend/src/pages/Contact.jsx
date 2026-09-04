import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className='my-6'>
      <div className='text-center max-w-2xl mx-auto mb-12'>
        <span className='text-[11px] font-mono uppercase tracking-wider text-neutral-500'>
          Get In Touch
        </span>
        <h1 className='text-3xl sm:text-4xl font-semibold text-neutral-950 tracking-[-0.03em] mt-1'>
          Clinical Offices & Contact
        </h1>
        <p className='text-xs sm:text-sm text-neutral-500 mt-2 leading-relaxed'>
          Our clinical coordination team is ready to assist patients and healthcare networks.
        </p>
      </div>

      <div className='my-10 grid grid-cols-1 md:grid-cols-12 gap-10 items-center max-w-4xl mx-auto'>
        <div className='md:col-span-5'>
          <img
            className='w-full h-80 sm:h-96 object-cover rounded-xl border border-neutral-200 bg-neutral-100 shadow-whisper'
            src={assets.contact_image}
            alt="Appointy Office"
          />
        </div>

        <div className='md:col-span-7 flex flex-col gap-6 text-xs sm:text-sm text-neutral-600'>
          <div className='border border-neutral-200 bg-white rounded-lg p-6 shadow-whisper flex flex-col gap-3'>
<span className='font-mono text-xs uppercase tracking-wider text-neutral-400'>Headquarters</span>
              <p className='text-base font-semibold text-neutral-950'>India Operations Center</p>
              <p className='text-neutral-500 leading-relaxed font-mono text-xs'>
                54709 Healthcare Plaza, Suite 350 <br />
                Mumbai, Maharashtra 400001, India
              </p>
              <div className='pt-2 border-t border-neutral-100 flex flex-col gap-1 text-xs font-mono text-neutral-700'>
                <p>Direct: +91 (22) 5555-0132</p>
                <p>Email: support@appointy.health</p>
              </div>
          </div>

          <div className='border border-neutral-200 bg-white rounded-lg p-6 shadow-whisper flex flex-col gap-3'>
            <span className='font-mono text-xs uppercase tracking-wider text-neutral-400'>Careers</span>
            <p className='text-base font-semibold text-neutral-950'>Join the Appointy Team</p>
            <p className='text-neutral-500 leading-relaxed text-xs'>
              We are hiring medical operations specialists, frontend engineers, and clinical partnership leads.
            </p>
            <div>
              <button
                onClick={() => alert('Thanks for your interest! Career portal opening soon.')}
                className='border border-neutral-300 hover:border-neutral-900 bg-neutral-900 hover:bg-black text-white text-xs font-medium px-5 py-2.5 rounded-md shadow-whisper transition-all active:scale-[0.98]'
              >
                Explore Open Positions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
