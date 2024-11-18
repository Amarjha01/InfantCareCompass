import React from 'react'

const Footer = () => {
  return (
    <div className='h-48 w-full footerBg rounded-t-3xl'>
        <div className=' flex justify-around p-6 gap-8'>
            <div className=' flex flex-col'>
                <span className=' text-xl font-bold text-center'>Contact Us</span>
                <span className='text-center p-1'>+91 919****97</span>
                <span className='text-center p-1'>help@infantcarecompass.live</span>
                <span className='text-center p-1'> 123 PGI, Roorkee, UK, India</span>
            </div>
            <div className='flex flex-col w-96'>
                <span className='text-xl font-bold text-center'>About US</span>
                <span>nfantCare Compass: Your all-in-one app for managing your child's health. Stay on top of vaccinations, access childcare tips, get AI-driven first aid guidance, and consult experts via video—healthcare made simple.</span>
            </div>
        </div>
        <div></div>
    </div>
  )
}

export default Footer