import React from 'react';
import Footer from './Footer';
// import TeamMember from '../assets/bag12.jpg';
import Event1Image from '../assets/bag12.jpg';
import Event2Image from '../assets/bag12.jpg';
import Event3Image from '../assets/bag12.jpg';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const AboutUs = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/login');
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar/>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-600 to-blue-300 py-20 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold text-white mb-4">About EventHive</h1>
          <p className="text-lg text-white">Discover the story behind EventHive and our mission to connect communities through events.</p>
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section className="py-10 bg-gradient-to-r from-pink-300 to-blue-600">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className='bg-gray-100 rounded-lg shadow-md p-6'>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-10px text-gray-700">At EventHive, our mission is to empower communities by providing a seamless platform for discovering, organizing, and participating in diverse and enriching events. We strive to foster connections, inspire learning, and facilitate meaningful experiences that contribute to personal growth and community development.</p>
            </div>
            <div className='bg-gray-100 rounded-lg shadow-md p-6'>
              <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
              <p className="text-10px text-gray-700">Our vision at EventHive is to become the leading global platform that connects individuals, organizations, and communities through accessible and transformative event experiences. We envision a world where everyone can easily discover and engage in events that align with their interests, passions, and goals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gradient-to-r from-pink-600 to-blue-300 py-16">
      <div className="max-w-7xl mx-auto px-4 ">
        <h2 className="text-3xl font-bold text-center mb-8">Event Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
          <div className="max-w-xs mx-auto rounded overflow-hidden shadow-lg bg-gray-100">
            <img src={Event1Image} alt="Event 1" className="w-full" />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">Event 1: Cultural Festival</div>
              <p className="text-gray-700 text-base">
              Celebrate the rich cultural heritage of our community with traditional music, dance, and food. Experience the vibrant colors and rhythms that define our local culture. Join us for a day of fun and learning as we showcase various cultural performances and activities.
              </p>
            </div>
          </div>
          <div className="max-w-xs mx-auto rounded overflow-hidden shadow-lg bg-gray-100">
            <img src={Event2Image} alt="Event 2" className="w-full" />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">Event 2: Food Festival</div>
              <p className="text-gray-700 text-base">
              Indulge in a gastronomic adventure at our food festival. Sample delicious dishes from local chefs, participate in cooking demos, and enjoy live music. From street food to gourmet meals, there's something to satisfy every palate.
              </p>
            </div>
          </div>
          <div className="max-w-xs mx-auto rounded overflow-hidden shadow-lg bg-gray-100">
            <img src={Event3Image} alt="Event 3" className="w-full" />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">Event 3:Dance Night</div>
              <p className="text-gray-700 text-base">
              Join us for an electrifying Dance Night! Enjoy dynamic performances, great music, and a lively atmosphere. Whether you're a seasoned dancer or just here for fun, this night promises excitement and unforgettable memories on the dance floor!.
              </p>
            </div>
          </div>
          {/* Add more events as needed */}
        </div>
      </div>
    </section>

      {/* Values Section */}
      <section className="py-16 bg-gradient-to-r from-pink-300 to-blue-600">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-100 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-2">Community First</h3>
              <p className="text-gray-700">At EventHive, our core value of "Community First" underscores our dedication to fostering inclusive and supportive environments. We prioritize building meaningful relationships and empowering individuals and organizations to thrive together through engagement-driven features and services.</p>
            </div>
            <div className="bg-gray-100 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p className="text-gray-700">Innovation is at the heart of EventHive's ethos. We embrace creativity and continuous improvement to pioneer new solutions that redefine community event management. By leveraging cutting-edge technologies and fostering a culture of experimentation, we strive to deliver unparalleled experiences that anticipate and exceed the evolving needs of our users and partners.</p>
            </div>
            <div className="bg-gray-100 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-2">Quality</h3>
              <p className="text-gray-700">At EventHive, we uphold uncompromising standards of quality in everything we do. From event curation to user experience, we prioritize excellence and attention to detail. By ensuring that every interaction and service meets the highest benchmarks, we aim to consistently deliver exceptional value and satisfaction to our community of users and stakeholders.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gradient-to-r from-pink-600 to-blue-300 py-16 text-center text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Join Us in Building the Future of Events</h2>
          <p className="text-lg mb-6">Become a part of our community and start discovering events near you.</p>
          <button onClick={handleClick}className="bg-gray-100 text-blue-500 font-bold py-2 px-6 rounded-full hover:bg-gray-200">Get Started</button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutUs; 
