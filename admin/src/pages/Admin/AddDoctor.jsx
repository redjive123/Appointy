import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AddDoctor = () => {

  const [docImg, setDocImg] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [speciality, setSpeciality] = useState('General physician')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')

  const { backendUrl } = useContext(AdminContext)
  const { aToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (!docImg) {
        return toast.error('Image Not Selected');
      }

      const formData = new FormData();

      formData.append('image', docImg);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('experience', experience);
      formData.append('fees', Number(fees));
      formData.append('about', about);
      formData.append('speciality', speciality);
      formData.append('degree', degree);
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));

      // Debugging FormData (optional, can remove later)
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      const response = await axios.post(`${backendUrl}/api/admin/add-doctor`, formData, {
        headers: { aToken}  })
      const data= response.data;
      if (data.success) {
                toast.success(data.message)
                setDocImg(false)
                setName('')
                setPassword('')
                setEmail('')
                setAddress1('')
                setAddress2('')
                setDegree('')
                setAbout('')
                setFees('')
            } else {
                toast.error(data.message)
            }

    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
      console.error(error);
    }
  }


  return (
    <form onSubmit={onSubmitHandler} className='p-6 w-full max-w-4xl'>
      <div className='mb-6'>
        <span className='text-[11px] font-mono uppercase tracking-wider text-neutral-500'>Practitioner Management</span>
        <h1 className='text-2xl font-semibold text-neutral-950 tracking-tight'>Register New Physician</h1>
        <p className='text-xs text-neutral-500 mt-0.5'>Add an accredited doctor to the clinical appointment directory.</p>
      </div>

      <div className='border border-neutral-200 bg-white rounded-lg p-6 sm:p-8 shadow-whisper flex flex-col gap-6 text-xs sm:text-sm'>
        {/* Upload picture */}
        <div className='flex items-center gap-4 text-xs text-neutral-600 border-b border-neutral-100 pb-6'>
          <label htmlFor="doc-img" className='cursor-pointer'>
            <div className='w-20 h-20 rounded-md border-2 border-dashed border-neutral-300 hover:border-neutral-900 bg-neutral-50 flex items-center justify-center overflow-hidden transition-colors'>
              <img className='w-full h-full object-cover' src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="" />
            </div>
          </label>
          <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
          <div>
            <p className='font-medium text-neutral-900'>Physician Portrait</p>
            <p className='text-neutral-400 text-xs mt-0.5'>Upload a clear clinical headshot (PNG or JPG)</p>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-1'>
              <label className='font-medium text-neutral-700 text-xs'>Doctor Full Name</label>
              <input onChange={e => setName(e.target.value)} value={name} className='border border-neutral-200 rounded-md px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 transition-all' type="text" placeholder='Dr. Jane Doe' required />
            </div>

            <div className='flex flex-col gap-1'>
              <label className='font-medium text-neutral-700 text-xs'>Doctor Email</label>
              <input onChange={e => setEmail(e.target.value)} value={email} className='border border-neutral-200 rounded-md px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 transition-all' type="email" placeholder='doctor@clinic.com' required />
            </div>

            <div className='flex flex-col gap-1'>
              <label className='font-medium text-neutral-700 text-xs'>Initial Password</label>
              <input onChange={e => setPassword(e.target.value)} value={password} className='border border-neutral-200 rounded-md px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 transition-all' type="password" placeholder='••••••••' required />
            </div>

            <div className='flex flex-col gap-1'>
              <label className='font-medium text-neutral-700 text-xs'>Clinical Experience</label>
              <select onChange={e => setExperience(e.target.value)} value={experience} className='border border-neutral-200 rounded-md px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 bg-white'>
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Years</option>
                <option value="3 Year">3 Years</option>
                <option value="4 Year">4 Years</option>
                <option value="5 Year">5 Years</option>
                <option value="6 Year">6 Years</option>
                <option value="8 Year">8 Years</option>
                <option value="10 Year">10+ Years</option>
              </select>
            </div>

            <div className='flex flex-col gap-1'>
              <label className='font-medium text-neutral-700 text-xs'>Consultation Fee ($)</label>
              <input onChange={e => setFees(e.target.value)} value={fees} className='border border-neutral-200 rounded-md px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 font-mono' type="number" placeholder='50' required />
            </div>
          </div>

          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-1'>
              <label className='font-medium text-neutral-700 text-xs'>Speciality</label>
              <select onChange={e => setSpeciality(e.target.value)} value={speciality} className='border border-neutral-200 rounded-md px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 bg-white'>
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div className='flex flex-col gap-1'>
              <label className='font-medium text-neutral-700 text-xs'>Medical Qualifications (Degree)</label>
              <input onChange={e => setDegree(e.target.value)} value={degree} className='border border-neutral-200 rounded-md px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900' type="text" placeholder='MBBS, MD' required />
            </div>

            <div className='flex flex-col gap-2'>
              <label className='font-medium text-neutral-700 text-xs'>Clinic / Hospital Address</label>
              <input onChange={e => setAddress1(e.target.value)} value={address1} className='border border-neutral-200 rounded-md px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900' type="text" placeholder='Suite / Street line 1' required />
              <input onChange={e => setAddress2(e.target.value)} value={address2} className='border border-neutral-200 rounded-md px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900' type="text" placeholder='City, State line 2' required />
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-1 pt-2 border-t border-neutral-100'>
          <label className='font-medium text-neutral-700 text-xs'>Clinical Bio & Summary</label>
          <textarea onChange={e => setAbout(e.target.value)} value={about} className='w-full px-3 py-2 border border-neutral-200 rounded-md text-xs text-neutral-900 focus:outline-none focus:border-neutral-900' rows={4} placeholder='Describe physician specialization, background, and approach to patient care...' required></textarea>
        </div>

        <div className='pt-2'>
          <button type='submit' className='bg-neutral-900 hover:bg-black text-white px-6 py-2.5 rounded-md text-xs font-medium shadow-whisper transition-all active:scale-[0.98]'>
            Register Physician
          </button>
        </div>
      </div>
    </form>
  )
}

export default AddDoctor