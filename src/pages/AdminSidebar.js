import React from 'react'
import { FaCalendarAlt, FaChartLine, FaClipboardList, FaComments, FaTachometerAlt, FaUsers } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'


export default function AdminSidebar() {
  return (
    
      <div className="w-full md:w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-gray-100 flex-shrink-0">
    <div className="py-8 px-4 sm:px-6 lg:px-8 border-b border-gray-700">
      <h2 className="text-2xl font-bold text-white">Welcome, Admin!</h2>
      {/* <h2 className="text-sm text-gray-400 mt-1">Welcome, Admin!</p> */}
    </div>
    <nav className="mt-4 flex-1 overflow-y-auto">
      <ul>
        <li>
          <NavLink to="/admindashboard" className="block py-4 px-4 hover:bg-gray-700 transition-all duration-200">
            <span className="flex items-center">
              <FaTachometerAlt className="h-5 w-5 mr-2" />
              Dashboard
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/events" className="block py-4 px-4 hover:bg-gray-700 transition-all duration-200">
            <span className="flex items-center">
              <FaCalendarAlt className="h-5 w-5 mr-2" />
              Event Management
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" className="block py-4 px-4 hover:bg-gray-700 transition-all duration-200">
            <span className="flex items-center">
              <FaUsers className="h-5 w-5 mr-2" />
              User Management
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/reports" className="block py-4 px-4 hover:bg-gray-700 transition-all duration-200">
            <span className="flex items-center">
              <FaChartLine className="h-5 w-5 mr-2" />
              Reporting
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/registrations" className="block py-4 px-4 hover:bg-gray-700 transition-all duration-200">
            <span className="flex items-center">
              <FaClipboardList className="h-5 w-5 mr-2" />
              Registration Monitoring
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/feedback" className="block py-4 px-4 hover:bg-gray-700 transition-all duration-200">
            <span className="flex items-center">
              <FaComments className="h-5 w-5 mr-2" />
              Feedback Monitoring
            </span>
          </NavLink>
        </li>
      </ul>
    </nav>
  </div>
  )
}
