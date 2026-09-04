import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from './context/AppContext'
import { assets } from './assets/assets'
import RelatedDoctors from './components/RelatedDoctors'
import axios from 'axios'
import { toast } from 'react-toastify'

const Appointment = () => {
  const { docId } = useParams()
  const navigate = useNavigate()
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext)
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const fetchDocInfo = async () => {
    const doc = doctors.find((doc) => doc._id === docId)
    if (doc) {
      // Ensure slots_booked is always at least an empty object
      setDocInfo({ ...doc, slots_booked: doc.slots_booked || {} })
    }
  }

  const getAvailableSlots = () => {
    if (!docInfo) return
    setDocSlots([])

    const today = new Date()

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      const endTime = new Date(currentDate)
      endTime.setHours(21, 0, 0, 0)

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      const timeSlots = []

      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })

        const day = currentDate.getDate()
        const month = currentDate.getMonth() + 1
        const year = currentDate.getFullYear()
        const slotDate = `${day}_${month}_${year}`
        const slotTime = formattedTime

        const isSlotAvailable =
          !docInfo?.slots_booked?.[slotDate] ||
          !docInfo.slots_booked[slotDate].includes(slotTime)

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime
          })
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      setDocSlots((prev) => [...prev, timeSlots])
    }
  }

  const bookAppointment = async () => {

    if (!token) {
      toast.warning('Login to book appointment')
      return navigate('/login')
    }

    const date = docSlots[slotIndex][0].datetime
  
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    const slotDate = day + "_" + month + "_" + year

    try {

      const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getDoctorsData()
        navigate('/my-appointments')
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }

  }

  useEffect(() => {
    if (doctors.length > 0) {
      fetchDocInfo()
    }
  }, [doctors, docId])

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots()
    }
  }, [docInfo])

  return (
    docInfo && (
      <div>
        {/* Doctor details */}
        <div className='flex flex-col sm:flex-row gap-6'>
          <div className='w-full sm:w-72 flex-shrink-0'>
            <img className='w-full h-72 sm:h-80 object-cover object-top rounded-lg border border-neutral-200 bg-neutral-100 shadow-whisper' src={docInfo.image} alt={docInfo.name} />
          </div>
          <div className='flex-1 border border-neutral-200 rounded-lg p-6 sm:p-8 bg-white shadow-whisper flex flex-col justify-between gap-4'>
            <div>
              <div className='flex items-center gap-2'>
                <h1 className='text-2xl sm:text-3xl font-semibold text-neutral-950 tracking-tight'>
                  {docInfo.name}
                </h1>
                <img className='w-5 h-5' src={assets.verified_icon} alt="Verified" />
              </div>
              <div className='flex items-center gap-2 mt-2 text-xs font-mono text-neutral-600'>
                <span>{docInfo.degree}</span>
                <span>•</span>
                <span className='font-sans font-medium text-neutral-800'>{docInfo.speciality}</span>
                <span className='py-0.5 px-2 border border-neutral-200 rounded-md bg-neutral-50 text-neutral-700 font-mono text-[11px]'>{docInfo.experience}</span>
              </div>
            </div>

            <div>
              <p className='flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-neutral-500 mb-1'>
                Clinical Background <img className='w-3.5 h-3.5 opacity-60' src={assets.info_icon} alt="" />
              </p>
              <p className='text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-2xl font-normal'>{docInfo.about}</p>
            </div>

            <div className='border-t border-neutral-100 pt-4 flex items-center justify-between'>
              <div>
                <p className='text-[11px] font-mono uppercase text-neutral-400'>Consultation Fee</p>
                <p className='text-xl font-semibold text-neutral-950 font-mono'>{currencySymbol}{docInfo.fees}</p>
              </div>
              <div className='inline-flex items-center gap-1.5 text-xs font-mono text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-md'>
                <span className='w-1.5 h-1.5 rounded-full bg-emerald-500'></span>
                Official Rate
              </div>
            </div>
          </div>
        </div>

        {/* Booking Slots */}
        <div className='mt-10 border border-neutral-200 bg-white rounded-lg p-6 sm:p-8 shadow-whisper'>
          <div className='flex items-center justify-between mb-4'>
            <div>
              <span className='text-[11px] font-mono uppercase tracking-wider text-neutral-500'>Scheduling</span>
              <h2 className='text-lg font-semibold text-neutral-950'>Available Consultation Slots</h2>
            </div>
            <span className='text-xs font-mono text-neutral-400'>Select day & time</span>
          </div>

          {/* Days */}
          <div className='flex gap-2.5 items-center w-full overflow-x-auto pb-2'>
            {docSlots.length > 0 &&
              docSlots.map((item, index) => (
                <button
                  onClick={() => setSlotIndex(index)}
                  key={index}
                  className={`text-center py-3 px-4 min-w-[72px] rounded-md border text-xs font-mono transition-all cursor-pointer flex flex-col items-center gap-1 ${
                    slotIndex === index
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                      : 'border-neutral-200 bg-white hover:border-neutral-300 text-neutral-700'
                  }`}
                >
                  <span className='uppercase text-[10px] tracking-wider text-neutral-400'>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</span>
                  <span className='text-base font-semibold'>{item[0] && item[0].datetime.getDate()}</span>
                </button>
              ))}
          </div>

          {/* Time Slots */}
          <div className='flex items-center gap-2 w-full overflow-x-auto pt-4 pb-2'>
            {docSlots.length > 0 &&
              docSlots[slotIndex] &&
              docSlots[slotIndex].map((item, index) => (
                <button
                  onClick={() => setSlotTime(item.time)}
                  key={index}
                  className={`text-xs font-mono flex-shrink-0 px-3.5 py-2 rounded-md border transition-all cursor-pointer ${
                    item.time === slotTime
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                      : 'border-neutral-200 bg-white hover:border-neutral-300 text-neutral-700 hover:text-neutral-950'
                  }`}
                >
                  {item.time.toLowerCase()}
                </button>
              ))}
          </div>

          {/* Book Button */}
          <div className='pt-6 border-t border-neutral-100 mt-6 flex items-center justify-between'>
            <p className='text-xs text-neutral-500'>
              {slotTime ? `Selected time: ${slotTime}` : 'Please select a time slot to proceed'}
            </p>
            <button
              onClick={bookAppointment}
              className='bg-neutral-900 hover:bg-black text-white text-xs sm:text-sm font-medium px-6 py-2.5 rounded-md shadow-whisper transition-all active:scale-[0.98]'
            >
              Confirm Appointment
            </button>
          </div>
        </div>

        {/* Related Doctors */}
        <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
      </div>
    )
  )
}

export default Appointment
