import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-teal-400 text-white">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Welcome to EventHive</h1>
      <p className="text-lg md:text-xl mb-8 text-center">Discover and join exciting community events.</p>
      <Link to="/home">
        <button className="bg-white text-blue-500 font-bold py-2 px-4 rounded-full hover:bg-gray-200">
          Get Started
        </button>
      </Link>
    </div>
  );
};

export default LandingPage;
