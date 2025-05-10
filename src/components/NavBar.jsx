import React from 'react'
import { NavLink } from 'react-router-dom'
const NavBar = () => {
  return (
    <div className='flex flex-row gap-3 text-white  place-content-center  text-3xl bg-[#353535]'>
        <NavLink
        to="/"
        className='text-white'
        
      >Home</NavLink>
        <NavLink
        to="/paste"
        className={({ isActive }) =>
          `no-underline ${isActive ? 'text-white font-bold' : 'text-white'}`
        }
      >Paste</NavLink>
    </div>
  )
}

export default NavBar