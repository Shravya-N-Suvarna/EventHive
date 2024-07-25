import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import Logout from './Logout';
import { useAuth } from '../context/AuthProvider';
import axios from 'axios';
import ProfileForm from './ProfileForm';

const Navbar = () => {
  const [authUser] = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [ setShowLogin] = useState(false);
  const [ showProfile, setShowProfile] = useState(false);
  const [ setUserEvents] = useState([]);
  const [showAdminLogin,setShowAdminLogin] = useState(false);

  useEffect(() => {
    if (authUser) {
      const fetchUserEvents = async () => {
        try {
          const response = await axios.get(`/api/events/user/${authUser.id}`);
          setUserEvents(response.data);
        } catch (error) {
          console.error("Error fetching user events:", error);
        }
      };
      fetchUserEvents();
    }
  }, );

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogin = () => {
    setShowLogin(true);
  };

  const handleAdminClick = () => {
    setShowAdminLogin(true);
  };

  // const handleCloseLogin = () => {
  //   setShowLogin(false);
  // };

  // const handleProfileClick = () => {
  //   setShowProfile(true);
  // };

  const handleCloseProfile = () => {
    setShowProfile(false);
  };

  return (
    <div>
         <header className="bg-gray-900 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="text-2xl font-bold">
            <Link to="/">EventHive</Link>
          </div>
          <nav className="hidden md:flex space-x-4 justify-center">
            <Link to="/home" className='flex items-center'>Home</Link>
            <Link to="/about" className='flex items-center'>About Us</Link>
            <Link to="/contact" className='flex items-center'>Contact</Link>
            <Link to="/event" className='flex items-center'>Events</Link>
            {authUser && (
              <Link to="/myEvents" className="block text-white">My Events</Link>
            )}
          </nav>
          <div className="hidden md:flex items-center space-x-4">
            {!authUser && !showAdminLogin && (
              <button onClick={handleAdminClick} className='py-2'>Admin</button>
            )}
            {authUser ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfile(true)}
                  className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border border-gray-300 bg-gray-200"
                >
                  {authUser.profilePicture ? (
                    <img src={authUser.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-gray-600 text-xl flex items-center justify-center">
                      {authUser.name ? authUser.name.charAt(0).toUpperCase() : '?'}
                    </span>
                  )}
                </button>
              </div>
            ) : (
              <button>
                <Link to="" className="bg-red-500 px-4 py-2 rounded" onClick={handleLogin}>Login</Link>
              </button>
            )}
            {authUser && <Logout />}
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
              {authUser && (
                <Link to="/myEvents" className="block text-white">My Events</Link>
              )}
              {!authUser && !showAdminLogin && (
                <button onClick={handleAdminClick} className="block text-white">Admin</button>
              )}
              {authUser && (
                <>
                  <button onClick={() => setShowProfile(true)} className="block text-white items-center space-x-2">
                    {authUser.profilePicture ? (
                      <img src={authUser.profilePicture} alt="Profile" className="w-8 h-8 rounded-full" />
                    ) : (
                      <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-black font-bold">
                        {authUser.name ? authUser.name.charAt(0).toUpperCase() : '?'}
                      </span>
                    )}
                    {/* <span>{authUser.name}</span> */}
                  </button>
                  <Logout />
                </>
              )}
              {!authUser && (
                <button className="block bg-red-500  px-4 py-2 rounded" onClick={handleLogin}>Login</button>
              )}
            </nav>
          </div>
        )}
      </header>
      {showProfile && authUser && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <button onClick={handleCloseProfile} className="absolute top-4 right-4 text-gray-500">
              &times;
            </button>
            <ProfileForm user={authUser} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;