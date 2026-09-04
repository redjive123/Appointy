import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext)
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)
  const [appointments, setAppointments] = useState([])
  const [payment, setPayment] = useState('')

  const months = [" ", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const slotDateFormat = (slotDate) => {
    const [day, month, year] = slotDate.split('_')
    return `${day} ${months[Number(month)]} ${year}`
  }

  // Getting User Appointments Data Using API
  const getUserAppointments = async () => {
    try {

      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
      setAppointments(data.appointments.reverse())

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  // Function to cancel appointment Using API
  const cancelAppointment = async (appointmentId) => {

    try {

      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })

      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }

  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {

        console.log(response)

        try {
          const { data } = await axios.post(backendUrl + "/api/user/verifyRazorpay", response, { headers: { token } });
          if (data.success) {
            navigate('/my-appointments')
            getUserAppointments()
          }
        } catch (error) {
          console.log(error)
          toast.error(error.message)
        }
      }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  // Function to make payment using razorpay
  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } })
      if (data.success) {
        initPay(data.order)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])

  // Generate appointment data from doctors
  useEffect(() => {
    if (doctors.length) {
      const generatedAppointments = doctors.slice(0, 3).map((doc, idx) => ({
        _id: `appointment_${idx}`,
        docData: {
          name: doc.name,
          speciality: doc.speciality,
          image: doc.image,
          address: doc.address || { line1: "Street X", line2: "City Y" }
        },
        slotDate: `12_0${idx + 1}_2025`,
        slotTime: `${10 + idx}:00 AM`,
        payment: idx === 1,         // Simulate second one as paid
        isCompleted: idx === 2,     // Simulate third one as completed
        cancelled: false
      }))
      setAppointments(generatedAppointments)
    }
  }, [doctors])



  const simulateStripe = () => toast.info("Redirecting to Stripe...")
  const simulateRazorpay = () => toast.info("Opening Razorpay...")

  return (
    <div className='my-6'>
      <div className='mb-6'>
        <span className='text-[11px] font-mono uppercase tracking-wider text-neutral-500'>
          Patient Dashboard
        </span>
        <h1 className='text-2xl sm:text-3xl font-semibold text-neutral-950 tracking-[-0.03em]'>
          My Appointments
        </h1>
        <p className='text-xs sm:text-sm text-neutral-500 mt-1'>
          Track scheduled clinical consultations, review billing receipts, and manage appointments.
        </p>
      </div>

      <div className='flex flex-col gap-4'>
        {appointments.length === 0 ? (
          <div className='text-center py-16 border border-dashed border-neutral-300 rounded-lg bg-white p-8'>
            <p className='text-sm text-neutral-500'>You have no scheduled appointments.</p>
          </div>
        ) : (
          appointments.map((item, index) => (
            <div
              key={index}
              className='border border-neutral-200 bg-white rounded-lg p-5 shadow-whisper flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5'
            >
              <div className='flex items-start gap-4'>
                <img
                  className='w-24 h-24 sm:w-28 sm:h-28 rounded-md object-cover object-top border border-neutral-200 bg-neutral-100 flex-shrink-0'
                  src={item.docData.image}
                  alt={item.docData.name}
                />
                <div className='flex flex-col gap-1 text-xs text-neutral-600'>
                  <div className='flex items-center gap-2'>
                    <p className='text-base font-semibold text-neutral-950 tracking-tight'>
                      {item.docData.name}
                    </p>
                    <span className='px-2 py-0.5 rounded-md border border-neutral-200 bg-neutral-50 font-mono text-[11px] text-neutral-700'>
                      {item.docData.speciality}
                    </span>
                  </div>

                  <p className='text-neutral-500 mt-1 font-mono text-[11px]'>
                    {item.docData.address.line1}, {item.docData.address.line2}
                  </p>

                  <div className='flex items-center gap-2 mt-2 pt-2 border-t border-neutral-100 font-mono text-xs text-neutral-800'>
                    <span className='text-neutral-400 uppercase text-[10px]'>Schedule:</span>
                    <span className='font-semibold'>{slotDateFormat(item.slotDate)}</span>
                    <span>at</span>
                    <span className='font-semibold'>{item.slotTime}</span>
                  </div>
                </div>
              </div>

              {/* Status & Actions */}
              <div className='flex flex-col gap-2 w-full sm:w-44 flex-shrink-0'>
                {!item.cancelled && !item.payment && !item.isCompleted && payment !== item._id && (
                  <button
                    onClick={() => setPayment(item._id)}
                    className='w-full py-2 px-3 rounded-md border border-neutral-200 bg-neutral-900 hover:bg-black text-white text-xs font-medium shadow-whisper transition-all'
                  >
                    Pay Online
                  </button>
                )}

                {!item.cancelled && !item.payment && !item.isCompleted && payment === item._id && (
                  <button
                    onClick={() => appointmentRazorpay(item._id)}
                    className='w-full py-2 px-3 rounded-md border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-800 text-xs font-medium shadow-whisper transition-all flex items-center justify-center'
                  >
                    <img className='max-h-4' src={assets.razorpay_logo} alt="Razorpay" />
                  </button>
                )}

                {!item.cancelled && item.payment && !item.isCompleted && (
                  <span className='w-full py-1.5 rounded-md border border-emerald-200 bg-emerald-50 text-emerald-700 text-xs font-mono font-medium text-center'>
                    ✓ Payment Verified
                  </span>
                )}

                {item.isCompleted && (
                  <span className='w-full py-1.5 rounded-md border border-neutral-200 bg-neutral-100 text-neutral-700 text-xs font-mono font-medium text-center'>
                    Completed
                  </span>
                )}

                {!item.cancelled && !item.isCompleted && (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className='w-full py-1.5 px-3 rounded-md border border-neutral-200 bg-white hover:bg-red-50 hover:border-red-200 hover:text-red-700 text-neutral-600 text-xs font-medium transition-all'
                  >
                    Cancel appointment
                  </button>
                )}

                {item.cancelled && !item.isCompleted && (
                  <span className='w-full py-1.5 rounded-md border border-red-200 bg-red-50 text-red-700 text-xs font-mono font-medium text-center'>
                    Cancelled
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default MyAppointments
