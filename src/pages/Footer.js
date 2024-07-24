import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        {/* About Section */}
        <div className='space-y-4'>
          <h3 className="text-xl font-bold mb-4">About EventHive</h3>
          <p className="text-gray-400">
            EventHive is your ultimate platform <br></br> for discovering, organizing, and <br></br> participating in community events.<br></br> Whether you're looking to join a <br></br> workshop, attend a seminar, or <br></br> network at a meetup, EventHive <br></br>connects you with events that match<br></br> your interests.
          </p>
        </div>

         {/* Contact Section */}
         <div className='space-y-4'>
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <p className="text-gray-400">123 EventHive Street, Event City, <br></br>EH 45678</p>
          <p className="text-gray-400">Email: support@eventhive.com</p>
          <p className="text-gray-400">Phone: (123) 456-7890</p>
        </div>

        {/* Quick Links Section */}
        <div className='space-y-4'>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/home" className="hover:text-gray-400">Home</Link></li>
            <li><Link to="/about" className="hover:text-gray-400">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-gray-400">Contact</Link></li>
            <li><Link to="/events" className="hover:text-gray-400">Events</Link></li>
            <li><Link to="/login" className="hover:text-gray-400">Login</Link></li>
          </ul>
        </div>

       

        {/* Social Media Section */}
        <div className='space-y-4'>
          <h3 className="text-xl font-bold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FaFacebook size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FaTwitter size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-4 text-center">
        <p>&copy; 2024 EventHive. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
