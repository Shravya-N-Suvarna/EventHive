import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);
  // const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      try {
        const response = await axios.get('http://localhost:4001/all_events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching registered events:', error);
      }
    };

    const getUser = () => {
      try {
        const token = localStorage.getItem('Users');
        if (token) {
          const userData = JSON.parse(token);
          setUser(userData);
        }
      } catch (error) {
        console.error('Error retrieving user from local storage:', error);
      }
    };

    getUser(); // Load user from local storage
    fetchRegisteredEvents(); // Fetch events from the server
  }, []);

  const cancelEvent = async (eventId) => {
    console.log(`Attempting to cancel event with ID: ${eventId}`);
    try {
      await axios.delete(`http://localhost:4001/registrations/${eventId}`);
      console.log(`Successfully cancelled event with ID: ${eventId}`);
      setEvents(prevEvents => prevEvents.filter(event => event._id !== eventId));
    } catch (error) {
      console.error('Error cancelling the event:', error);
    }
  };

  const filteredEvents = user
    ? events.filter(event => event.email === user.email)
    : [];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mb-4">My Registered Events</h1>
        {user && <p>Welcome, {user.name}!</p>}
        {filteredEvents.length === 0 ? (
          <p>No registered events found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border-separate border-spacing-2 border border-black">
              <thead>
                <tr>
                  <th className="py-2 px-4 border border-black">S.No.</th>
                  <th className="py-2 px-4 border border-black">Image</th>
                  <th className="py-2 px-4 border border-black">Title</th>
                  <th className="py-2 px-4 border border-black">Description</th>
                  <th className="py-2 px-4 border border-black">Date</th>
                  <th className="py-2 px-4 border border-black">Time</th>
                  <th className="py-2 px-4 border border-black">Location</th>
                  <th className="py-2 px-4 border border-black">Address</th>
                  <th className="py-2 px-4 border border-black">Contact</th>
                  <th className="py-2 px-4 border border-black">Actions</th>
                  <th className="py-2 px-4 border border-black">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map((event, index) => (
                  <tr key={event._id}>
                    <td className="border border-black px-4 py-2 text-center">{index + 1}</td>
                    <td className="border border-black px-4 py-2 text-center">
                      {event.eventId && event.eventId.image ? (
                        <img src={event.eventId.image} alt={event.eventId.title} className="w-24 h-24 object-cover mx-auto" />
                      ) : (
                        <div>No image available</div>
                      )}
                    </td>
                    <td className="border border-black px-4 py-2 text-center">
                      {event.eventId && event.eventId.title ? event.eventId.title : 'No title available'}
                    </td>
                    <td className="border border-black px-4 py-2 text-center">
                      {event.eventId && event.eventId.description ? event.eventId.description : 'No description available'}
                    </td>
                    <td className="border border-black px-4 py-2 text-center">
                      {event.eventId && event.eventId.date ? new Date(event.eventId.date).toLocaleDateString() : 'No date available'}
                    </td>
                    <td className="border border-black px-4 py-2 text-center">
                      {event.eventId && event.eventId.time ? event.eventId.time : 'No time available'}
                    </td>
                    <td className="border border-black px-4 py-2 text-center">
                      {event.eventId && event.eventId.location ? event.eventId.location : 'No location available'}
                    </td>
                    <td className="border border-black px-4 py-2 text-center">{event.address}</td>
                    <td className="border border-black px-4 py-2 text-center">{event.phone}</td>
                    <td className="border border-black px-4 py-2 text-center">
                      <button
                        onClick={() => cancelEvent(event._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </td>
                    <td className="border border-black px-4 py-2 text-center">
                        {event.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyEvents;
