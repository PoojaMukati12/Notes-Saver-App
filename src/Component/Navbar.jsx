import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
    <div className="fixed top-0 left-0 w-full bg-white h-12 flex items-center justify-evenly shadow-md">
    <NavLink to="/"
    className={({ isActive }) => isActive ? "text-blue-500 font-bold  text-xl" : "text-black  text-xl"}>Home</NavLink>
    <NavLink to="/pastes"
    className={({ isActive }) => isActive ? "text-blue-500 font-bold  text-xl" : "text-black  text-xl"}>Paste</NavLink>
    </div>
 
    </>
  )
}

export default Navbar