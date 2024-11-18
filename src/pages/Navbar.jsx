import React from 'react'
import logo from '../assets/Logo.svg'

const Navbar = () => {
  return (
    <div>
        <div className='flex w-full justify-center '>
      <div className=' nav  w-3/4 h-16 rounded-3xl flex justify-between items-center px-7 mt-7'>
            <span className=' cursor-pointer'>Deshboard</span>
            <span><img src={logo} alt="" /></span>
            <span className=' cursor-pointer'>Register</span>
        </div>
      </div>
    </div>
  )
}

export default Navbar