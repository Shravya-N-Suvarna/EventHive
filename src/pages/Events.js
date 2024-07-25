import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import RegistrationModal from './RegistrationModal';
import EventDetailsModal from './EventDetailsModal'; // Import the new modal component

const Events = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('asc');
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [isEventDetailsModalOpen, setIsEventDetailsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:4001/events");
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleRegister = (event) => {
    setSelectedEvent(event);
    setIsRegistrationModalOpen(true);
  };

  const handleEventDetails = (event) => {
    setSelectedEvent(event);
    setIsEventDetailsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsRegistrationModalOpen(false);
    setIsEventDetailsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleModalSubmit = async (formData) => {
    if (!selectedEvent) return;

    try {
      await axios.post(`http://localhost:4001/events/${selectedEvent._id}/register`, formData);
      alert('Successfully registered for the event!');
      setIsRegistrationModalOpen(false);
      setSelectedEvent(null);
      const response = await axios.get("http://localhost:4001/events");
      setEvents(response.data);
    } catch (error) {
      console.error('Error registering for event:', error);
      alert('Failed to register for the event.');
    }
  };

  const filteredEvents = events
    .filter(event => filter === 'all' || event.category === filter)
    .filter(event => event.title.toLowerCase().includes(search.toLowerCase()));

  // Sorting events by date
  const sortedEvents = filteredEvents.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sort === 'asc' ? dateA - dateB : dateB - dateA;
  });

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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-10 py-10 bg-white">
        <div className="bg-slate-300 p-4 sm:p-6 rounded-lg shadow-lg mb-4 sm:mb-6 md:mb-8 border-b-4 border-blue-500">
          <h1 className="text-2xl font-semibold mb-4">All Events</h1>

          <div className="flex flex-col md:flex-row mb-4 space-y-4 md:space-y-0 md:space-x-4">
            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 p-2 rounded-md w-full md:w-3/4"
            />
            <button className="bg-blue-500 text-white p-2 rounded-md w-full md:w-1/4">Search</button>
          </div>

          <div className="mb-4">
            <label htmlFor="filter" className="mr-2">Filter by category:</label>
            <select
              id="filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 p-2 rounded-md w-full max-w-xs"
            >
              <option value="all">All</option>
              <option value="workshop">Workshop</option>
              <option value="movie_nights">Movie Nights</option>
              <option value="comedy_shows">Comedy Shows</option>
              <option value="talent_shows">Talent Shows</option>
              <option value="game_nights">Game Nights</option>
              <option value="charity_events">Charity Events</option>
              <option value="festival_celebrations">Festival Celebrations</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="sort" className="mr-2">Sort by date:</label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border border-gray-300 p-2 rounded-md w-full max-w-xs"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg mb-4 sm:mb-6 md:mb-8 border-b-4 border-blue-500">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {sortedEvents.map(event => (
                <div key={event._id} className="rounded-lg shadow-md bg-slate-200">
                  {event.image && (
                    <img src={event.image} alt={event.title} className="w-full h-48 object-cover rounded-lg" />
                  )}
                  <div className="p-4">
                    <h3 className="text-xl font-bold">{event.title}</h3>
                    <p className="text-sm text-gray-600 mb-1">{formatDateTime(event.date, event.time)}</p>
                    <p className="text-sm text-gray-700 mb-1">{event.description}</p>
                    <p className="text-sm text-gray-700 mb-1">Location: {event.location}</p>
                    <div className="flex space-x-2 mt-2">
                      <button
                        className="bg-green-500 text-white p-2 rounded-md"
                        onClick={() => handleRegister(event)}
                      >
                        Register
                      </button>
                      <button
                        className="bg-blue-500 text-white p-2 rounded-md"
                        onClick={() => handleEventDetails(event)}
                      >
                        Event Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <RegistrationModal
            isOpen={isRegistrationModalOpen}
            onClose={handleModalClose}
            onSubmit={handleModalSubmit}
          />

          <EventDetailsModal
            isOpen={isEventDetailsModalOpen}
            onClose={handleModalClose}
            event={selectedEvent}
          />
        </div>
      </div>
    </div>
  );
};

export default Events;
