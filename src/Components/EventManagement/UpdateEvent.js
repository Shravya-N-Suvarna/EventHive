import React, { useState } from 'react';

const UpdateEvent = ({ event, onUpdate }) => {
  const [updatedEvent, setUpdatedEvent] = useState(event);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEvent(prevEvent => ({
      ...prevEvent,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(updatedEvent);
  };

  return (
    <div className="mt-20 ml-64 px-4">
      <h2 className="text-2xl font-semibold mb-4">Update Event</h2>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-4">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={updatedEvent.title}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-lg px-4 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Description</label>
          <textarea
            id="description"
            name="description"
            value={updatedEvent.description}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-lg px-4 py-2"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block text-gray-700 font-semibold mb-2">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={updatedEvent.location}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-lg px-4 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700 font-semibold mb-2">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={updatedEvent.date}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-lg px-4 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="time" className="block text-gray-700 font-semibold mb-2">Time</label>
          <input
            type="time"
            id="time"
            name="time"
            value={updatedEvent.time}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-lg px-4 py-2"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update Event</button>
      </form>
    </div>
  );
};

export default UpdateEvent;
