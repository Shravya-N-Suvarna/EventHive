import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';

const RegistrationMonitoring = () => {
  const [registrations, setRegistrations] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await axios.get('http://localhost:4001/registrations');
        setRegistrations(response.data);
      } catch (error) {
        console.error('Error fetching registrations:', error);
        setError('Failed to fetch registrations');
      }
    };

    fetchRegistrations();
  }, []);

  const handleAction = async (registrationId, action) => {
    console.log(`Handling action: ${action} for registrationId: ${registrationId}`);
    try {
      const response = await axios.post(`http://localhost:4001/registrations/${registrationId}/action`, { action });
      console.log('Response from server:', response.data);
      // Refetch registrations to update the list
      const updatedRegistrations = await axios.get('http://localhost:4001/registrations');
      setRegistrations(updatedRegistrations.data);
    } catch (error) {
      console.error('Error updating registration status:', error);
    }
  };

  const handleAttendance = async (registrationId, attended) => {
    try {
      await axios.post(`http://localhost:4001/registrations/${registrationId}/attendance`, { attended });
      // Refetch registrations to update the list
      const updatedRegistrations = await axios.get('http://localhost:4001/registrations');
      setRegistrations(updatedRegistrations.data);
    } catch (error) {
      console.error('Error updating attendance:', error);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (registrations.length === 0) {
    return <div>No registrations found</div>;
  }

  // Group registrations by event, handling null or undefined eventId
  const groupedRegistrations = registrations.reduce((acc, registration) => {
    if (registration.eventId) {
      const eventId = registration.eventId._id;
      if (!acc[eventId]) {
        acc[eventId] = {
          event: registration.eventId,
          registrations: [],
        };
      }
      acc[eventId].registrations.push(registration);
    }
    return acc;
  }, {});

  return (
    <div>
      <AdminNavbar />
      <div className="flex flex-col md:flex-row h-screen bg-gray-100">
        <AdminSidebar />
        <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto bg-slate-500">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg mb-4 sm:mb-6 md:mb-8 border-b-4 border-blue-500">
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-4">Registration Monitoring</h3>
            {Object.values(groupedRegistrations).map((group, index) => (
              <div key={group.event._id} className="mb-6">
                <h4 className="text-xl font-semibold mb-4">{group.event.title}</h4>
                <div className="overflow-x-auto">
                  <table className="w-full bg-white border-2 border-gray-300 rounded-lg shadow-md">
                    <thead className="bg-gray-200">
                      <tr className="border-b-2 border-gray-300">
                        <th className="py-3 px-4 text-center text-gray-800 font-bold border-r-2 border-gray-300">S.No.</th>
                        <th className="py-3 px-4 text-center text-gray-800 font-bold border-r-2 border-gray-300">Name</th>
                        <th className="py-3 px-4 text-center text-gray-800 font-bold border-r-2 border-gray-300">Email</th>
                        <th className="py-3 px-4 text-center text-gray-800 font-bold border-r-2 border-gray-300">Phone</th>
                        <th className="py-3 px-4 text-center text-gray-800 font-bold border-r-2 border-gray-300">Address</th>
                        <th className="py-3 px-4 text-center text-gray-800 font-bold border-r-2 border-gray-300">Status</th>
                        <th className="py-3 px-4 text-center text-gray-800 font-bold border-r-2 border-gray-300">Attendance</th>
                        <th className="py-3 px-4 text-center text-gray-800 font-bold border-r-2 border-gray-300">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.registrations.map((registration, idx) => (
                        <tr key={registration._id} className="hover:bg-gray-50 transition duration-150 border-b-2 border-gray-300">
                          <td className="py-3 px-4 border-r-2 border-gray-300 text-center">{idx+1}</td>
                          <td className="py-3 px-4 border-r-2 border-gray-300">{registration.name || 'N/A'}</td>
                          <td className="py-3 px-4 border-r-2 border-gray-300">{registration.email}</td>
                          <td className="py-3 px-4 border-r-2 border-gray-300">{registration.phone}</td>
                          <td className="py-3 px-4 border-r-2 border-gray-300">{registration.address}</td>
                          <td className="py-3 px-4 border-r-2 border-gray-300 text-center">
                            {registration.status === 'accepted' ? (
                              <span className="bg-green-200 text-green-700 px-2 py-1 rounded-full text-xs font-medium">Accepted</span>
                            ) : registration.status === 'rejected' ? (
                              <span className="bg-red-200 text-red-700 px-2 py-1 rounded-full text-xs font-medium">Rejected</span>
                            ) : (
                              <span className="bg-yellow-200 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium">Pending</span>
                            )}
                          </td>
                          <td className="py-3 px-4 border-r-2 border-gray-300 text-center">
                            {registration.status === 'accepted' && (
                              <span className="bg-blue-200 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                                {registration.attended ? 'Present' : 'Absent'}
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-center">
                            {registration.status === 'pending' && (
                              <div className="flex justify-center space-x-2">
                                <button
                                  onClick={() => handleAction(registration._id, 'accepted')}
                                  className="bg-green-500 text-white px-3 py-1 rounded-md shadow-md hover:bg-green-600 transition duration-150 text-sm font-medium"
                                >
                                  Accept
                                </button>
                                <button
                                  onClick={() => handleAction(registration._id, 'rejected')}
                                  className="bg-red-500 text-white px-3 py-1 rounded-md shadow-md hover:bg-red-600 transition duration-150 text-sm font-medium"
                                >
                                  Reject
                                </button>
                              </div>
                            )}
                            {registration.status === 'accepted' && (
                              <div className="flex justify-center space-x-2 mt-2">
                                <button
                                  onClick={() => handleAttendance(registration._id, true)}
                                  className="bg-blue-500 text-white px-3 py-1 rounded-md shadow-md hover:bg-blue-600 transition duration-150 text-sm font-medium"
                                >
                                  Mark Present
                                </button>
                                <button
                                  onClick={() => handleAttendance(registration._id, false)}
                                  className="bg-gray-500 text-white px-3 py-1 rounded-md shadow-md hover:bg-gray-600 transition duration-150 text-sm font-medium"
                                >
                                  Mark Absent
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationMonitoring;
