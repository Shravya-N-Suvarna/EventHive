import React, { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import axios from "axios";
import AdminNavbar from './AdminNavbar';

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    id: '',
    title: '',
    description: '',
    location: '',
    date: '',
    time: '',
    category: 'all',
    image: '',
  });

  const [selectedImage, setSelectedImage] = useState(null);

  // Fetch events on component mount
  useEffect(() => {
    const getEvents = async () => {
      try {
        const res = await axios.get("http://localhost:4001/events");
        setEvents(res.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    getEvents();
  }, []);

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setForm({
          ...form,
          image: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateEvent = async () => {
    try {
      const res = await axios.post("http://localhost:4001/events", {
        title: form.title,
        description: form.description,
        location: form.location,
        date: form.date,
        time: form.time,
        category: form.category,
        image: form.image,
      });
      setEvents([...events, res.data]);
      setForm({
        id: '',
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        category: 'all',
        image: '',
      });
      setSelectedImage(null);
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await axios.delete(`http://localhost:4001/events/${id}`);
      // Fetch events again to ensure the UI is updated
      const res = await axios.get('http://localhost:4001/events');
      setEvents(res.data);
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleUpdateEvent = async () => {
    try {
      const res = await axios.put(`http://localhost:4001/events/${form.id}`, {
        title: form.title,
        description: form.description,
        location: form.location,
        date: form.date,
        time: form.time,
        category: form.category,
        image: form.image,
      });
      const updatedEvents = events.map((event) =>
        event._id === form.id ? res.data : event
      );
      setEvents(updatedEvents);
      setForm({
        id: '',
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        category: 'all',
        image: '',
      });
      setSelectedImage(null);
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleSetFormFields = (event) => {
    setForm({
      id: event._id,
      title: event.title,
      description: event.description,
      location: event.location,
      date: event.date,
      time: event.time,
      category: event.category,
      image: event.image,
    });
    setSelectedImage(event.image);
  };

  const formatDateTime = (dateString, timeString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} - ${timeString || `${hours}:${minutes}`}`;
  };

  // Filter events based on selected category
  const filteredEvents = form.category === 'all'
  ? events
  : events.filter(event => event.category.trim().toLowerCase() === form.category.trim().toLowerCase());
  const sortedEvents = filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div>
      <AdminNavbar />
      <div className="flex flex-col md:flex-row h-screen bg-gray-100">
        <AdminSidebar />
        <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto bg-slate-500">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg mb-4 sm:mb-6 md:mb-8 border-b-4 border-blue-500">
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-4">Event Management</h3>
            <form className="mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleInputChange}
                  placeholder="Event Title"
                  className="p-2 border border-gray-300 rounded-lg w-full"
                />
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleInputChange}
                  placeholder="Location"
                  className="p-2 border border-gray-300 rounded-lg w-full"
                />
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleInputChange}
                  className="p-2 border border-gray-300 rounded-lg w-full"
                />
                <input
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={handleInputChange}
                  className="p-2 border border-gray-300 rounded-lg w-full"
                />
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleInputChange}
                  placeholder="Event Description"
                  className="p-2 border border-gray-300 rounded-lg col-span-2 w-full"
                />
                <select
                  name="category"
                  value={form.category}
                  onChange={handleInputChange}
                  className="p-2 border border-gray-300 rounded-lg w-full"
                >
                  <option value="all">All</option>
                  <option value="workshop">Workshop</option>
                  <option value="movie_nights">Movie Nights</option>
                  <option value="comedy_shows">Comedy Shows</option>
                  <option value="talent_shows">Talent Shows</option>
                  <option value="game_nights">Game Nights</option>
                  <option value="charity_event">Charity Event</option>
                  <option value="festival_celebrations">Festival Celebrations</option>
                </select>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="p-2 border border-gray-300 rounded-lg col-span-2 w-full"
                />
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="w-full h-32 object-cover rounded-lg col-span-2"
                  />
                )}
              </div>
              <div className="mt-4 flex flex-col sm:flex-row sm:space-x-2">
                {form.id ? (
                  <button
                    type="button"
                    onClick={handleUpdateEvent}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mb-2 sm:mb-0"
                  >
                    Update Event
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleCreateEvent}
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg mb-2 sm:mb-0"
                  >
                    Create Event
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setForm({
                      id: '',
                      title: '',
                      description: '',
                      location: '',
                      date: '',
                      time: '',
                      category: 'all',
                      image: '',
                    });
                    setSelectedImage(null);
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
                >
                  Clear Form
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg mb-4 sm:mb-6 md:mb-8 border-b-4 border-blue-500">
            <div className="mb-4">
              <label htmlFor="category" className="mr-2">Filter by category:</label>
              <select
                id="category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="border border-gray-300 p-2 rounded-md w-full max-w-xs"
              >
                <option value="all">All</option>
                <option value="workshop">Workshop</option>
                <option value="movie_nights">Movie Nights</option>
                <option value="comedy_shows">Comedy Shows</option>
                <option value="talent_shows">Talent Shows</option>
                <option value="game_nights">Game Nights</option>
                <option value="charity_event">Charity Event</option>
                <option value="festival_celebrations">Festival Celebrations</option>
              </select>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Events</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                {sortedEvents.map(event => (
                  <li key={event._id} className="bg-gray-200 p-4 rounded-lg shadow-md">
                    {event.image && (
                      <img src={event.image} alt={event.title} className="w-full h-32 object-cover rounded-lg mb-2" />
                    )}
                    <p className="text-lg font-semibold mb-1">{event.title}</p>
                    <p className="text-sm text-gray-600 mb-1">{formatDateTime(event.date, event.time)}</p>
                    <p className="text-sm text-gray-700 mb-1">{event.description}</p>
                    <p className="text-sm text-gray-700 mb-2">Location: {event.location}</p>
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={() => handleSetFormFields(event)}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-lg"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteEvent(event._id)}
                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-lg"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageEvents;
