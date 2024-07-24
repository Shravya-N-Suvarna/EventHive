import React, { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';

const AdminDashboard = () => {
  const [totalEvents, setTotalEvents] = useState(0);
  const [activeEvents] = useState(0);
  const [pendingApprovals, setPendingApprovals] = useState(0); // Update state for pending approvals
  const [totalUsers, setTotalUsers] = useState(0);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:4001/events');
        const data = await response.json();
        setEvents(data);
        setTotalEvents(data.length); // Assuming the total number of events is the length of the events array
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    const fetchTotalUsers = async () => {
      try {
        const response = await fetch('http://localhost:4001/user/all'); // Make sure this matches the backend route
        const data = await response.json();
        if (Array.isArray(data)) {
          setTotalUsers(data.length); // Set the total number of users
        } else {
          console.error('Expected an array of users but got:', data);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const fetchPendingApprovals = async () => {
      try {
        const response = await fetch('http://localhost:4001/user/status?status=pending');
        const data = await response.json();
        if (Array.isArray(data)) {
          setPendingApprovals(data.length); // Set the count of pending approvals
        } else {
          console.error('Expected an array of pending users but got:', data);
        }
      } catch (error) {
        console.error('Error fetching pending users:', error);
      }
    };

    fetchEvents();
    fetchTotalUsers();
    fetchPendingApprovals(); // Fetch pending approvals
  }, []);

  const today = new Date();

  const sortedEvents = events.sort((a, b) => new Date(a.date) - new Date(b.date));

  const upcomingEvents = sortedEvents.filter(event => new Date(event.date) >= today).slice(0, 3);

  const reverseSortedEvents = events.sort((a, b) => new Date(b.date) - new Date(a.date));

  const recentEvents = reverseSortedEvents.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate < today && eventDate >= new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3);
  }).slice(0, 3);

  const formatDateTime = (dateString, timeString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} - ${timeString || `${hours}:${minutes}`}`;
  };

  return (
    <div>
      <AdminNavbar />
      <div className="flex flex-col md:flex-row h-screen bg-gray-100">
        <AdminSidebar />
        <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto bg-slate-500">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-6 md:mb-8">
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg border-b-4 border-blue-500">
                <h3 className="text-lg sm:text-xl font-bold text-slate-800">Total Events</h3>
                <p className="text-2xl sm:text-3xl font-bold text-blue-500 mt-2">{totalEvents}</p>
              </div>
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg border-b-4 border-green-500">
                <h3 className="text-lg sm:text-xl font-bold text-slate-800">Pending Event Registration Approvals</h3>
                <p className="text-2xl sm:text-3xl font-bold text-green-500 mt-2">{activeEvents}</p>
              </div>
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg border-b-4 border-yellow-500">
                <h3 className="text-lg sm:text-xl font-bold text-slate-800">Pending User Approvals</h3>
                <p className="text-2xl sm:text-3xl font-bold text-yellow-500 mt-2">{pendingApprovals}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-6 md:mb-8">
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg border-b-4 border-red-500">
                <h3 className="text-lg sm:text-xl font-bold text-slate-800">Total Users</h3>
                <p className="text-2xl sm:text-3xl font-bold text-red-500 mt-2">{totalUsers}</p>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg mb-4 sm:mb-6 md:mb-8 border-b-4 border-indigo-500">
              <h3 className="text-lg sm:text-xl font-bold text-slate-800">Upcoming Events</h3>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {upcomingEvents.map(event => (
                  <div key={event._id} className="flex flex-col p-4 bg-slate-300 rounded-lg shadow-lg">
                    <img src={event.image} alt={event.title} className="h-40 w-full object-cover mb-4 rounded-lg" />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <p className="text-lg font-semibold">{event.title}</p>
                        <p className="text-sm text-gray-600">{formatDateTime(event.date, event.time)}</p>
                        <p className="text-sm text-gray-700">{event.description}</p>
                        <p className="text-sm text-gray-600">{event.location}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg mb-4 sm:mb-6 md:mb-8 border-b-4 border-purple-500">
              <h3 className="text-lg sm:text-xl font-bold text-slate-800">Recent Events</h3>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {recentEvents.map(event => (
                  <div key={event._id} className="flex flex-col p-4 bg-slate-300 rounded-lg shadow-lg">
                    <img src={event.image} alt={event.title} className="h-40 w-full object-cover mb-4 rounded-lg" />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <p className="text-lg font-semibold">{event.title}</p>
                        <p className="text-sm text-gray-600">{formatDateTime(event.date, event.time)}</p>
                        <p className="text-sm text-gray-700">{event.description}</p>
                        <p className="text-sm text-gray-600">{event.location}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
