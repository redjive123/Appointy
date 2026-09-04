import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const DoctorProfile = () => {

    const { dToken, profileData, setProfileData, getProfileData, backendUrl } = useContext(DoctorContext)
    const { currency} = useContext(AppContext)
    const [isEdit, setIsEdit] = useState(false)

    const updateProfile = async () => {

        try {

            const updateData = {
                address: profileData.address,
                fees: profileData.fees,
                about: profileData.about,
                available: profileData.available
            }

            const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dToken } })

            if (data.success) {
                toast.success(data.message)
                setIsEdit(false)
                getProfileData()
            } else {
                toast.error(data.message)
            }

            setIsEdit(false)

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    useEffect(() => {
        if (dToken) {
            getProfileData()
        }
    }, [dToken])

    return profileData && (
        <div className='p-6 max-w-5xl'>
            <div className='flex flex-col md:flex-row gap-6'>
                <div className='w-full md:w-64 shrink-0'>
                    <div className='border border-hairline rounded-lg overflow-hidden bg-neutral-50 p-2 shadow-whisper'>
                        <img className='w-full h-64 md:h-72 object-cover rounded-md' src={profileData.image} alt={profileData.name} />
                    </div>
                </div>

                <div className='flex-1 border border-hairline rounded-lg p-7 bg-white shadow-whisper'>
                    {/* ----- Doc Info : name, degree, experience ----- */}
                    <div className='flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-hairline'>
                        <div>
                            <h1 className='text-2xl font-semibold tracking-tight text-neutral-900'>{profileData.name}</h1>
                            <p className='text-sm text-neutral-500 mt-0.5'>{profileData.degree} · <span className='text-neutral-700 font-medium'>{profileData.speciality}</span></p>
                        </div>
                        <span className='px-2.5 py-1 border border-hairline text-xs font-mono text-neutral-600 rounded-md bg-canvas'>
                            {profileData.experience} exp
                        </span>
                    </div>

                    {/* ----- Doc About ----- */}
                    <div className='py-5 border-b border-hairline'>
                        <label className='block text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2'>About</label>
                        {
                            isEdit
                                ? <textarea 
                                    onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))} 
                                    className='w-full border border-hairline rounded-md p-3 text-sm text-neutral-800 focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400 font-sans' 
                                    rows={5} 
                                    value={profileData.about} 
                                  />
                                : <p className='text-sm text-neutral-600 leading-relaxed max-w-2xl'>{profileData.about}</p>
                        }
                    </div>

                    {/* ----- Fees & Availability ----- */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 py-5 border-b border-hairline text-sm'>
                        <div>
                            <label className='block text-xs font-mono uppercase tracking-wider text-neutral-500 mb-1.5'>Appointment Fee</label>
                            {
                                isEdit
                                    ? <div className='flex items-center gap-1.5'>
                                        <span className='text-neutral-500 font-medium'>{currency}</span>
                                        <input 
                                            type='number' 
                                            onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} 
                                            value={profileData.fees}
                                            className='border border-hairline rounded-md px-3 py-1.5 text-sm w-32 focus:outline-none focus:border-neutral-400' 
                                        />
                                      </div>
                                    : <p className='text-base font-semibold text-neutral-900'>{currency} {profileData.fees}</p>
                            }
                        </div>

                        <div>
                            <label className='block text-xs font-mono uppercase tracking-wider text-neutral-500 mb-1.5'>Status</label>
                            <label className='inline-flex items-center gap-2 cursor-pointer'>
                                <input 
                                    type="checkbox" 
                                    onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} 
                                    checked={profileData.available} 
                                    disabled={!isEdit}
                                    className='w-4 h-4 rounded border-hairline accent-neutral-900 cursor-pointer disabled:cursor-not-allowed'
                                />
                                <span className={`text-sm font-medium ${profileData.available ? 'text-emerald-700' : 'text-neutral-500'}`}>
                                    {profileData.available ? 'Available for Appointments' : 'Unavailable'}
                                </span>
                            </label>
                        </div>
                    </div>

                    {/* ----- Clinic Address ----- */}
                    <div className='py-5 border-b border-hairline text-sm'>
                        <label className='block text-xs font-mono uppercase tracking-wider text-neutral-500 mb-1.5'>Clinic Address</label>
                        {
                            isEdit
                                ? <div className='flex flex-col gap-2 max-w-md'>
                                    <input 
                                        type='text' 
                                        placeholder='Address line 1'
                                        onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} 
                                        value={profileData.address?.line1 || ''} 
                                        className='border border-hairline rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-neutral-400'
                                    />
                                    <input 
                                        type='text' 
                                        placeholder='Address line 2'
                                        onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} 
                                        value={profileData.address?.line2 || ''} 
                                        className='border border-hairline rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-neutral-400'
                                    />
                                  </div>
                                : <p className='text-neutral-700 leading-relaxed'>
                                    {profileData.address?.line1 || 'No address line 1'}<br />
                                    {profileData.address?.line2 || ''}
                                  </p>
                        }
                    </div>

                    {/* ----- Action Buttons ----- */}
                    <div className='pt-6 flex gap-3'>
                        {
                            isEdit
                                ? <>
                                    <button 
                                        onClick={updateProfile} 
                                        className='px-5 py-2 text-xs font-medium uppercase tracking-wider text-white bg-neutral-900 hover:bg-black rounded-md transition-colors shadow-sm active:scale-[0.98]'
                                    >
                                        Save Changes
                                    </button>
                                    <button 
                                        onClick={() => setIsEdit(false)} 
                                        className='px-5 py-2 text-xs font-medium uppercase tracking-wider text-neutral-700 bg-white hover:bg-neutral-50 border border-hairline rounded-md transition-colors'
                                    >
                                        Cancel
                                    </button>
                                  </>
                                : <button 
                                    onClick={() => setIsEdit(true)} 
                                    className='px-5 py-2 text-xs font-medium uppercase tracking-wider text-neutral-900 bg-white hover:bg-neutral-50 border border-hairline rounded-md transition-colors shadow-sm active:scale-[0.98]'
                                  >
                                    Edit Profile
                                  </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorProfile