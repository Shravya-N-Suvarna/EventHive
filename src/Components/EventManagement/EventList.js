import React, { useState } from 'react';

const EventList = () => {
  const [events, setEvents] = useState([
    { id: 1, title: 'Workshop on React.js', description: 'Join us for a workshop on React.js basics.', location: 'Online', date: '2024-07-10', time: '10:00 AM' },
    { id: 2, title: 'Charity Fundraiser', description: 'Help us raise funds for a local charity.', location: 'Community Hall', date: '2024-07-15', time: '3:00 PM' }
    // Add more events as needed
  ]);

  const handleDelete = (eventId) => {
    const updatedEvents = events.filter(event => event.id !== eventId);
    setEvents(updatedEvents);
  };

  return (
    <div className="mt-20 ml-64 px-4">
      <h2 className="text-2xl font-semibold mb-4">Event List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map(event => (
          <div key={event.id} className="bg-white rounded-lg shadow-lg p-4">
            <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
            <p className="text-gray-600 mb-2">{event.description}</p>
            <p className="text-gray-600 mb-2">{event.date} at {event.time}</p>
            <p className="text-gray-600 mb-2">{event.location}</p>
            <div className="flex justify-end">
              <button
                onClick={() => handleDelete(event.id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
