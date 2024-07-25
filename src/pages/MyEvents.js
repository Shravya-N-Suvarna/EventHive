import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);
  const [feedback, setFeedback] = useState({});
  const [submittedFeedback, setSubmittedFeedback] = useState({});

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

    const loadFeedbackState = () => {
      const storedFeedback = localStorage.getItem('submittedFeedback');
      if (storedFeedback) {
        setSubmittedFeedback(JSON.parse(storedFeedback));
      }
    };

    getUser(); // Load user from local storage
    fetchRegisteredEvents(); // Fetch events from the server
    loadFeedbackState(); // Load feedback submission state from local storage
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

  const isCancellationAllowed = (eventDate) => {
    const now = new Date();
    const eventDateObj = new Date(eventDate);
    const diffInTime = eventDateObj.getTime() - now.getTime();
    const diffInDays = diffInTime / (1000 * 3600 * 24);
    return diffInDays > 2;
  };

  const filteredEvents = user
    ? events.filter(event => event.email === user.email)
    : [];

  const handleFeedbackChange = (e, eventId) => {
    const { value } = e.target;
    setFeedback(prevFeedback => ({ ...prevFeedback, [eventId]: value }));
  };

  const submitFeedback = async (eventId) => {
    console.log('Submitting feedback for event:', eventId);
    console.log('Feedback text:', feedback[eventId]);
    try {
      const response = await axios.post('http://localhost:4001/feedback/feedback', {
        eventId,
        userId: user._id,
        feedback: feedback[eventId]
      });
      console.log('Feedback response:', response.data);
      alert('Feedback submitted successfully!');
      
      // Update and store submitted feedback state
      setSubmittedFeedback(prevSubmittedFeedback => {
        const updatedFeedback = { ...prevSubmittedFeedback, [eventId]: true };
        localStorage.setItem('submittedFeedback', JSON.stringify(updatedFeedback));
        return updatedFeedback;
      });
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-6 py-8 bg-slate-300 ">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg mb-4 sm:mb-6 md:mb-8 border-b-4 border-blue-500">
          <h1 className="text-2xl font-bold mb-4">My Registered Events</h1>
          {user && <p>Welcome, {user.name}!</p>}
          {filteredEvents.length === 0 ? (
            <p>No registered events found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-slate-200 border-separate border-spacing-2 border border-black">
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
                    <th className="py-2 px-4 border border-black">Feedback</th>
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
                        {isCancellationAllowed(event.eventId.date) ? (
                          <button
                            onClick={() => cancelEvent(event._id)}
                            className="bg-red-500 text-white px-3 py-3 rounded-full hover:bg-red-700"
                          >
                            Cancel
                          </button>
                        ) : (
                          <button className="bg-blue-500 text-white px-3 py-3 rounded-full hover:bg-blue-700 transition duration-150 text-sm font-medium">Cannot Cancel</button>
                        )}
                      </td>
                      <td className="border border-black px-4 py-2 text-center ">
                        {event.status === 'accepted' ? (
                          <span className="bg-green-500 text-white px-3 py-3 rounded-full text-xs font-medium">Accepted</span>
                        ) : event.status === 'rejected' ? (
                          <span className="bg-red-500 text-white px-3 py-3 rounded-full text-xs font-medium">Rejected</span>
                        ) : (
                          <span className="bg-yellow-500 text-white px-3 py-3 rounded-full text-xs font-medium">Pending</span>
                        )}
                      </td>
                      <td className="border border-black px-4 py-2 text-center">
                        <textarea
                          value={feedback[event._id] || ''}
                          onChange={(e) => handleFeedbackChange(e, event._id)}
                          className={`w-full p-2 border border-gray-300 rounded-md ${submittedFeedback[event._id] ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                          readOnly={submittedFeedback[event._id]}
                        />
                        <button
                          onClick={() => submitFeedback(event._id)}
                          disabled={submittedFeedback[event._id]}
                          className={`bg-blue-500 text-white px-3 py-2 rounded-full mt-2 hover:bg-blue-700 ${submittedFeedback[event._id] ? 'cursor-not-allowed' : ''}`}
                        >
                          {submittedFeedback[event._id] ? 'Submitted' : 'Submit Feedback'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyEvents;
