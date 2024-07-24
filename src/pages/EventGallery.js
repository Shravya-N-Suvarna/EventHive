import React from 'react';
import bag3 from '../assets/bag3.jpg'

const EventGallery = () => {
  const events = [
    { id: 1, title: 'Community Meetup', image: bag3 },
    { id: 2, title: 'Tech Workshop', image: bag3 },
    { id: 3, title: 'Art Exhibition', image: bag3},
    { id: 4, title: 'Music Concert', image: bag3 },
    { id: 5, title: 'Food Festival', image: bag3 },
    { id: 6, title: 'Charity Run', image: bag3 },
  ];

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8">Event Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {events.map(event => (
            <div key={event.id} className="bg-pink-200 rounded-lg shadow-md overflow-hidden">
              <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold">{event.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventGallery;
