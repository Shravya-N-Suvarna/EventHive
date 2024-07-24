import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4001/user/all', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Adjust this line as per your auth setup
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const updateUserStatus = async (userId, status) => {
    try {
      await axios.post(
        'http://localhost:4001/user/update-status',
        { userId, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Adjust this line as per your auth setup
          },
        }
      );
      setUsers(users.map(user => (user._id === userId ? { ...user, status } : user)));
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div className="flex flex-col md:flex-row h-screen bg-gray-100">
        <AdminSidebar />
        <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto bg-slate-500">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg mb-4 sm:mb-6 md:mb-8 border-b-4 border-blue-500">
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-4">Manage Users</h3>
            <div className="overflow-x-auto">
              <table className="w-full bg-white border-2 border-black rounded-lg shadow-md">
                <thead className="bg-gray-200">
                  <tr className="border-b-2 border-black">
                    <th className="py-3 px-4 text-center text-gray-800 font-bold border-r-2 border-black">S.No.</th>
                    <th className="py-3 px-4 text-center text-gray-800 font-bold border-r-2 border-black">Name</th>
                    <th className="py-3 px-4 text-center text-gray-800 font-bold border-r-2 border-black">Email</th>
                    <th className="py-3 px-4 text-center text-gray-800 font-bold border-r-2 border-black">Status</th>
                    <th className="py-3 px-4 text-center text-gray-800 font-bold border-r-2 border-black">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user._id} className="hover:bg-gray-50 transition duration-150 border-b-2 border-black">
                      <td className="py-3 px-4 border-r-2 border-black text-center">{index + 1}</td>
                      <td className="py-3 px-4 border-r-2 border-black">{user.name || 'N/A'}</td>
                      <td className="py-3 px-4 border-r-2 border-black">{user.email}</td>
                      <td className="py-3 px-4 border-r-2 border-black">
                        {user.status === 'accepted' ? (
                          <span className="bg-green-200 text-green-700 px-2 py-1 rounded-full text-xs font-medium">Accepted</span>
                        ) : user.status === 'rejected' ? (
                          <span className="bg-red-200 text-red-700 px-2 py-1 rounded-full text-xs font-medium">Rejected</span>
                        ) : (
                          <span className="bg-yellow-200 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium">Pending</span>
                        )}
                      </td>
                      <td className="py-3 px-4 flex space-x-2">
                        {user.status === 'pending' && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => updateUserStatus(user._id, 'accepted')}
                              className="bg-green-500 text-white px-3 py-1 rounded-md shadow-md hover:bg-green-600 transition duration-150 text-sm font-medium"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => updateUserStatus(user._id, 'rejected')}
                              className="bg-red-500 text-white px-3 py-1 rounded-md shadow-md hover:bg-red-600 transition duration-150 text-sm font-medium"
                            >
                              Reject
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
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
