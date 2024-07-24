import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import toast from 'react-hot-toast';

const AdminNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Clear authentication tokens/session data here
    // For example, remove token from local storage
    localStorage.removeItem('authToken'); // Replace 'authToken' with your actual token key

    // Optionally, clear user session or state if using context or a global state management
    // Example:
    // setAuthUser(null); 
    toast.success('Logged out successfully!');
  
    // Redirect to login page
    navigate('/home');
  };

  return (
    <div>
      <header className="bg-gradient-to-b from-gray-600 to-gray-900 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="text-2xl font-bold">
            <h2 className="text-3xl text-left font-bold text-white">EventHive</h2>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <div
                className="flex items-center cursor-pointer"
                onClick={toggleDropdown}
              >
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-500 text-white">
                  A
                </div>
                {/* <span className="ml-2 text-white">Admin</span> */}
              </div>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 py-2 w-40 bg-red-500 border rounded-lg shadow-xl ">
                  <button
                    className="block px-2 py-2 text-gray-800 font-bold text-center "
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="text-white">
              <FaBars className="w-6 h-6" />
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-gradient-to-b from-gray-600 to-gray-900">
            <nav className="px-4 pt-2 pb-4 space-y-2">
              <div className="relative">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={toggleDropdown}
                >
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-500 text-white">
                    A
                  </div>
                  {/* <span className="ml-2 text-white">Admin</span> */}
                </div>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 py-2 w-40 bg-red-400 border rounded-lg shadow-xl ">
                    <button
                      className="block px-4 py-2 text-gray-800 font-bold text-center "
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
};

export default AdminNavbar;
