import React from 'react';
import Footer from './Footer';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import Navbar from './Navbar';

const Contact = () => {
  return (
    <div className="bg-gradient-to-r from-blue-400 to-pink-200 min-h-screen">
      <Navbar/>
      {/* first Section */}
      <section className="bg-gradient-to-r from-pink-400 to-blue-200 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center text-black">
            <h2 className="text-4xl font-bold mb-6">Visit Us Today</h2>
            <p className="text-lg">We'd love to hear from you. Contact us for any inquiries or just to say hello!</p>
          </div>
        </div>
      </section>
      
      {/* First Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
             {/* Contact Details Section */}
             <div>
              <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">123 EventHive Street, Event City, EH 45678</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Email: support@eventhive.com</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Phone: (123) 456-7890</p>
                </div>
              </div>
            
             {/* Social Media Section */}
             <div className=' mx-auto py-10'>
        <div className="space-y-4">
          <h3 className="text-3xl font-bold mb-6">Follow Us</h3>
          <div className="flex space-x-8">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-white">
              <FaFacebook size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-white">
              <FaTwitter size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-white">
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
        </div>
        </div>
            {/* Contact Form Section */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <input type="text" id="name" name="name" className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 h-10" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" id="email"  name="email" className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 h-10" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea id="message" name="message" rows="4" className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"></textarea>
                </div>
                <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Send Message</button>
              </form>
            </div>

           
          </div>
        </div>
      </section>

      

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Contact;
