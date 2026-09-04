import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyProfile = () => {
    const [isEdit, setIsEdit] = useState(false)
    const [image, setImage] = useState(false)

    const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext)

    const updateUserProfileData = async () => {
        try {
            const formData = new FormData()
            formData.append('name', userData.name)
            formData.append('phone', userData.phone)
            formData.append('address', JSON.stringify(userData.address))
            formData.append('gender', userData.gender)
            formData.append('dob', userData.dob)
            image && formData.append('image', image)

            const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                await loadUserProfileData()
                setIsEdit(false)
                setImage(false)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    return userData ? (
        <div className='my-6 max-w-xl'>
            <div className='mb-6'>
                <span className='text-[11px] font-mono uppercase tracking-wider text-neutral-500'>
                    Patient Settings
                </span>
                <h1 className='text-2xl sm:text-3xl font-semibold text-neutral-950 tracking-[-0.03em]'>
                    Personal Profile
                </h1>
                <p className='text-xs sm:text-sm text-neutral-500 mt-1'>
                    Manage your medical records contact info and identity verification.
                </p>
            </div>

            <div className='border border-neutral-200 bg-white rounded-lg p-6 sm:p-8 shadow-whisper flex flex-col gap-6 text-xs sm:text-sm'>
                <div className='flex items-center gap-5'>
                    {isEdit ? (
                        <label htmlFor='image' className='cursor-pointer'>
                            <div className='relative w-24 h-24 rounded-full overflow-hidden border-2 border-dashed border-neutral-300 hover:border-neutral-900 transition-colors'>
                                <img className='w-full h-full object-cover opacity-80' src={image ? URL.createObjectURL(image) : (userData.image || assets.profile_pic)} alt="Profile" />
                                <div className='absolute inset-0 bg-black/30 flex items-center justify-center text-[10px] text-white font-mono uppercase'>Upload</div>
                            </div>
                            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                        </label>
                    ) : (
                        <img className='w-24 h-24 rounded-full object-cover border border-neutral-200 shadow-sm' src={userData.image || assets.profile_pic} alt="Profile" />
                    )}

                    <div>
                        {isEdit ? (
                            <input
                                className='border border-neutral-200 bg-white rounded-md px-3 py-1.5 text-base font-semibold text-neutral-950 focus:outline-none focus:border-neutral-900 transition-all'
                                type="text"
                                onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                                value={userData.name}
                            />
                        ) : (
                            <h2 className='text-xl font-semibold text-neutral-950 tracking-tight'>{userData.name}</h2>
                        )}
                        <p className='text-xs text-neutral-400 font-mono mt-0.5'>{userData.email}</p>
                    </div>
                </div>

                <div className='border-t border-neutral-100 pt-4 flex flex-col gap-4'>
                    <span className='font-mono text-[11px] uppercase tracking-wider text-neutral-400'>
                        Contact Details
                    </span>

                    <div className='grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-3 items-center text-xs'>
                        <span className='text-neutral-500 font-medium'>Email</span>
                        <span className='font-mono text-neutral-900'>{userData.email}</span>

                        <span className='text-neutral-500 font-medium'>Phone</span>
                        {isEdit ? (
                            <input
                                className='border border-neutral-200 bg-white rounded-md px-3 py-1.5 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 max-w-xs'
                                type="text"
                                onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                                value={userData.phone}
                            />
                        ) : (
                            <span className='font-mono text-neutral-900'>{userData.phone || 'Not provided'}</span>
                        )}

                        <span className='text-neutral-500 font-medium'>Address</span>
                        {isEdit ? (
                            <div className='flex flex-col gap-2 max-w-xs'>
                                <input
                                    className='border border-neutral-200 bg-white rounded-md px-3 py-1.5 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900'
                                    type="text"
                                    placeholder="Address Line 1"
                                    onChange={(e) => setUserData(prev => ({
                                        ...prev,
                                        address: { ...(prev.address || {}), line1: e.target.value }
                                    }))}
                                    value={userData.address?.line1 || ''}
                                />
                                <input
                                    className='border border-neutral-200 bg-white rounded-md px-3 py-1.5 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900'
                                    type="text"
                                    placeholder="Address Line 2"
                                    onChange={(e) => setUserData(prev => ({
                                        ...prev,
                                        address: { ...(prev.address || {}), line2: e.target.value }
                                    }))}
                                    value={userData.address?.line2 || ''}
                                />
                            </div>
                        ) : (
                            <span className='font-mono text-neutral-900'>
                                {userData.address?.line1 || 'No address set'}, {userData.address?.line2 || ''}
                            </span>
                        )}
                    </div>
                </div>

                <div className='border-t border-neutral-100 pt-4 flex flex-col gap-4'>
                    <span className='font-mono text-[11px] uppercase tracking-wider text-neutral-400'>
                        Personal Information
                    </span>

                    <div className='grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-3 items-center text-xs'>
                        <span className='text-neutral-500 font-medium'>Gender</span>
                        {isEdit ? (
                            <select
                                className='border border-neutral-200 bg-white rounded-md px-3 py-1.5 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 max-w-xs'
                                onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                                value={userData.gender}
                            >
                                <option value="Not Selected">Not Selected</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        ) : (
                            <span className='font-mono text-neutral-900'>{userData.gender || 'Not Selected'}</span>
                        )}

                        <span className='text-neutral-500 font-medium'>Date of Birth</span>
                        {isEdit ? (
                            <input
                                className='border border-neutral-200 bg-white rounded-md px-3 py-1.5 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 max-w-xs'
                                type='date'
                                onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                                value={userData.dob}
                            />
                        ) : (
                            <span className='font-mono text-neutral-900'>{userData.dob || 'Not provided'}</span>
                        )}
                    </div>
                </div>

                <div className='border-t border-neutral-100 pt-4 flex items-center gap-3'>
                    {isEdit ? (
                        <button
                            onClick={updateUserProfileData}
                            className='bg-neutral-900 hover:bg-black text-white px-5 py-2 rounded-md text-xs font-medium shadow-whisper transition-all active:scale-[0.98]'
                        >
                            Save Information
                        </button>
                    ) : (
                        <button
                            onClick={() => setIsEdit(true)}
                            className='border border-neutral-300 hover:border-neutral-900 bg-white hover:bg-neutral-50 text-neutral-900 px-5 py-2 rounded-md text-xs font-medium shadow-whisper transition-all'
                        >
                            Edit Profile
                        </button>
                    )}
                </div>
            </div>
        </div>
    ) : null
}

export default MyProfile
