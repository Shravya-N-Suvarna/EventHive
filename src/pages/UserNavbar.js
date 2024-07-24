import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {  FaBars } from 'react-icons/fa';


import Logout from './Logout';

import { useAuth } from '../context/AuthProvider';

const Navbar = () => {
  const [authUser,setAuthUser]= useAuth();
  console.log(authUser);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const handleLogin = () => {
    // Perform logout logic here
    setAuthUser(null);
    navigate('/login');
  };

  return (
    <div>
        <header className="bg-zinc-900 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="text-2xl font-bold">
            
            <Link to="/">EventHive</Link>
            
            </div>
          <nav className="hidden md:flex space-x-4 justify-center">
          
            <Link to="/home" className='flex items-center'>Home</Link>
            <Link to="/about" className='flex items-center'>About Us</Link>
            <Link to="/contact" className='flex items-center'>Contact</Link>
            <Link to="/event" className='flex items-center'>Events</Link>
            {/* <Link to="/events" className='cursor-pointer group flex items-center gap-[2px] py-2'>Events
            <sapn><FaCaretDown className='group-hover:rotate-180 duration-300'/></sapn></Link> */}
            {/* <div><ul>
              {
              // DropdownLinks.map((data)=>( 
                <li>A</li>
                
                
              // ))
              }
                </ul>
                </div> */}
            
            
            
          </nav>
        
        <div className="hidden md:flex space-x-4 justify-center"> 
          {/* <Link to="/admin" className=' py-2'>Admin</Link>
        <Link to="/user"className=' py-2'>User</Link> */}
        {/* {authUser ? (
          <Logout />
        ) : (
          <div className=''>
            <Link 
            className="bg-green text-white px-3 py-2 rounded-md hover:bg-slate-800 duration-300 cursor-pointer"
            // onClick={() =>
            //   document.getElementById()}
            >Login</Link>
            
            </div>
        )} */}
        <Link to="/myEvents" className=' py-2'>My Events</Link>
        {authUser ? (
            <Logout/>) :(
              <button><Link to="/login" className="bg-red-500 px-4 py-2 rounded "  onClick={handleLogin}>Login</Link>
           </button> 
            )}
        </div>

        <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="text-white">
              <FaBars className="w-6 h-6" />
            </button>
          </div>

        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden bg-zinc-900">
            <nav className="px-4 pt-2 pb-4 space-y-2">
              <Link to="/home" className="block text-white">Home</Link>
              <Link to="/about" className="block text-white">About Us</Link>
              <Link to="/contact" className="block text-white">Contact</Link>
              <Link to="/event" className="block text-white">Events</Link>
              {/* <Link to="/admin" className="block text-white">Admin</Link>
              <Link to="/user" className="block text-white">User</Link> */}
            <Link to="/myEvents" className="block text-white">My Events</Link>
            
            <div className="flex justify-start">
              
              {authUser ? (
                <Logout />
              ) : (
                <Link to="/login" className="block bg-red-500 px-4 py-2 rounded" onClick={handleLogin}>Login</Link>
              )}
              
              </div>
            </nav>
          </div>
        )}

      </header>

    </div>
  )
}
export default Navbar;