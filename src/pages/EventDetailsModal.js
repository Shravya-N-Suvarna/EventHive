import React from 'react';
import Modal from 'react-modal';

const EventDetailsModal = ({ isOpen, onClose, event }) => {
  if (!event) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Event Details"
      className="fixed inset-0 flex items-center justify-center p-4"
      overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75"
    >
      <div className="relative bg-white rounded-lg shadow-lg max-w-4xl w-full px-12 py-8">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <h2 className="text-3xl font-bold mb-4">{event.title}</h2>
        {event.image && (
          <img src={event.image} alt={event.title} className="w-full h-56 object-center mb-8 rounded-md" />
        )}
        <p className="text-lg mb-2">Date & Time: {new Date(event.date).toLocaleDateString()} {event.time}</p>
        <p className="text-lg mb-2">Location: {event.location}</p>
        <p className="text-lg">Description: {event.description}</p>
      </div>
    </Modal>
  );
};

export default EventDetailsModal;
