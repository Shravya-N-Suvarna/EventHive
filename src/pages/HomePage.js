import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroImg from "../assets/Hero.jpg";
import { FaArrowRight, FaBars } from 'react-icons/fa';
import EventGallery from './EventGallery';
import Footer from './Footer';
import Logout from './Logout';
import AdminLogin from './AdminLogin';
import Login from './Login';
import Register from './Register';
import ProfileForm from './ProfileForm';
import { useAuth } from '../context/AuthProvider';
import axios from 'axios';

const HomePage = () => {
  const [authUser] = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [ setUserEvents] = useState([]);
  // const navigate = useNavigate();

  useEffect(() => {
    if (authUser) {
      // Fetch user events
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
  },  );

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleExploreClick = () => {
    setShowLogin(true);
  };

  const handleLogin = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const handleRegister = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  const handleAdminClick = () => {
    setShowAdminLogin(true);
  };

  const handleCloseAdminLogin = () => {
    setShowAdminLogin(false);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  const handleCloseRegister = () => {
    setShowRegister(false);
  };

  const handleCloseProfile = () => {
    setShowProfile(false);
  };

  const handleEventsClick = (e) => {
    if (!authUser) {
      e.preventDefault();
      setShowLogin(true);
    }
  };

  return (
    <div>
      {/* Navbar */}
      <header className="bg-zinc-900 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="text-2xl font-bold">
            <Link to="/">EventHive</Link>
          </div>
          <nav className="hidden md:flex space-x-4 justify-center">
            <Link to="/home" className='flex items-center'>Home</Link>
            <Link to="/about" className='flex items-center'>About Us</Link>
            <Link to="/contact" className='flex items-center'>Contact</Link>
            <Link to="/event" className='flex items-center' onClick={handleEventsClick}>Events</Link>
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
              <Link to="/event" className="block text-white" onClick={handleEventsClick}>Events</Link>
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
                      <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-600">
                        {authUser.name ? authUser.name.charAt(0).toUpperCase() : '?'}
                      </span>
                    )}
                    {/* <span>{authUser.name}</span> */}
                  </button>
                  <Logout />
                </>
              )}
              {!authUser && (
                <Link to="" className="block bg-red-500 px-4 py-2 rounded" onClick={handleLogin}>Login</Link>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* Conditional Rendering of Admin Login */}
      {showAdminLogin && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <button onClick={handleCloseAdminLogin} className="absolute top-4 right-4 text-gray-500">
              &times;
            </button>
            <AdminLogin />
          </div>
        </div>
      )}

      {/* Conditional Rendering of User Login */}
      {showLogin && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <button onClick={handleCloseLogin} className="absolute top-4 right-4 text-gray-500">
              &times;
            </button>
            <Login onShowRegister={handleRegister} />
          </div>
        </div>
      )}

      {/* Conditional Rendering of Registration */}
      {showRegister && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <button onClick={handleCloseRegister} className="absolute top-4 right-4 text-gray-500">
              &times;
            </button>
            <Register onShowLogin={handleLogin}/>
          </div>
        </div>
      )}

      {/* Conditional Rendering of Profile Form */}
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

      {/* Main Content */}
      <div>
        {/* Hero Section */}
        <div className='bg-gradient-to-r from-pink-300 to-blue-200'>
          <div className='container py-16 sm:py-0'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 place-items-center min-h-[600px]'>
              <div className='space-y-7 text-dark order-2 sm:order-1'>
                <h1 className='text-5xl'>Welcome to <br /> <span className="text-blue-950 font-cursive font-bold text-7xl">EventHive</span></h1>
                <p className='lg:pr-64'>Your ultimate platform for discovering <br />and participating in community events.</p>
                <div className='flex items-center group'>
                  <button className='bg-red-500 h-[40px] text-white px-3 py-2' onClick={handleExploreClick}>Explore Your Interest</button>
                  <FaArrowRight className='inline-block group-hover:!translate-x-2 duration-200 p-2 text-base h-[40px] w-[40px] bg-red-600 text-white' />
                </div>
              </div>
              {/* Image section */}
              <div className='relative z-30 order-1 sm:order-2'>
                <img src={HeroImg} alt="" className='w-full sm:scale-110 sm:translate-y-4' />
              </div>
            </div>
          </div>
        </div>

        <div className='bg-blue-100'>
          <EventGallery />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
