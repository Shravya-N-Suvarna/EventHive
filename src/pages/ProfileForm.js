import React from 'react';

const ProfileForm = ({ user }) => {
  return (
    <div className=" bg-gradient-to-r from-pink-300 to-blue-400 p-6 rounded-lg shadow-lg w-full max-w-md">
      <div className="flex flex-col items-center">
        {/* Profile Picture */}
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300 mb-4">
          {user.profilePicture ? (
            <img src={user.profilePicture} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-blue-700 text-3xl">
              {user.name ? user.name.charAt(0).toUpperCase() : '?'}
            </div>
          )}
        </div>
        {/* Profile Information */}
        <div className="w-full ">
          <div className="mb-4 ">
            <label htmlFor="name" className="block text-blue-700 font-semibold mb-2">Name</label>
            <div
              id="name"
              className="w-full p-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed text-black font-bold"
            >
              {user.name}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-blue-700 font-semibold mb-2">Email</label>
            <div
              id="email"
              className="w-full p-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed text-black font-bold"
            >
              {user.email}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
