import React from 'react'
import './custome.css'
import babyImg from '../assets/babyImg.svg'
import Calendar from '../assets/October-Calendar.png'
const home = () => {
  return (
    <div className='container'>
      

      {/* Herosection */}
        <div className=' w-1vw flex flex-col lg:flex-row  '>
            <div>
                <span><img src={babyImg} alt="" /></span>
                <div className='h-44 w-96 vaccinationNotification ml-4 relative bottom-10 rounded-3xl customeShadow '>
                    <div className='flex flex-col'>
                    <span className=' text-black pl-11 text-4xl '>vaccination schedule </span>
                    <span className=' text-black pl-11 text-lx'>Hepatitis B</span>
                    </div>
                    <button className='notificationbtn w-72 h-14 rounded-3xl relative top-7 ml-6 '>Vaccinated </button>
                </div> 
            </div>
            <div className='vacCalendar h-96 w-3/4 max-w-screen-md mt-7 ml-4 rounded-3xl flex p-4 justify-around customeShadow '>
            <div className=' h-96 w-80'>
                <img className=' cursor-pointer' src={Calendar} alt="" />
            </div>
            <div className=''>
                <span className='text-3xl '>vaccination schedule </span>
            <div className='h-56 flex flex-col'>
                <span className='h-14 w-60 bg-white p-2 text-center rounded-3xl my-2'>Hepatitis B second dose</span>
                <span className='h-14 w-60 bg-white p-2 text-center rounded-3xl my-2'>DTaP first dost </span>
                <span className='h-14 w-60 bg-white p-2 text-center rounded-3xl my-2'>DTaP first dost</span>
                <span className='h-14 w-60 bg-white p-2 text-center rounded-3xl my-2'>IPV first dost</span>
            </div>
            </div>
            </div>
        </div>
       <div className=' w-1vw flex justify-center items-center'>
       <div className=' w-9/12 h-56  rounded-3xl  '>
            <div className=' flex justify-evenly items-center'>
                <div className=' h-48 w-48 services rounded-3xl flex justify-center items-center cursor-pointer font-bold customeShadow'><a href="https://www.apollo247.com/specialties/paediatrics">Book Consultat</a></div>
                <div className=' h-48 w-48 services rounded-3xl flex justify-center items-center cursor-pointer font-bold customeShadow'>Childcare Education</div>
                <div className=' h-48 w-48 services rounded-3xl flex justify-center items-center cursor-pointer font-bold customeShadow'>AI-driven First Aid</div>
                <div className=' h-48 w-48 services rounded-3xl flex justify-center items-center cursor-pointer font-bold customeShadow'>Vaccination schedule</div>
            </div>
        </div>
       </div>
    </div>
  )
}

export default home